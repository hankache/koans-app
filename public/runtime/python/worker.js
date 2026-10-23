// Runs Python koans on Pyodide (CPython compiled to WebAssembly). In the browser this is a module
// worker, so a long-running koan can't freeze the page and a runaway one can be killed; under
// Node, the build tools import makeRunner() from it (languages/python/node.mjs), so the checker
// and the tests use this same code.
//
// Koans are written the pytest way: plain `assert` statements, and `with pytest.raises(…)`. Like
// pytest, the runner rewrites them before running the koan (RUN_KOAN, below): each assert becomes a
// check that prints its result as TAP, with both sides of a failed comparison, and the koan
// carries on to the next one, so every blank is checked. An assert that still holds a blank fails
// without running. Line numbers stay exactly as written. The helpers it calls come from the
// prelude (languages/python/prelude.py), on the koan's first line.
//
// Protocol:  in  { type: 'run', id, src }
//            out { type: 'ready', version } | { type: 'loaderror', message }
//                { type: 'done', id, rc, lines: [{ stream, text }] }
//                { type: 'crash', id, message, lines }   (interpreter rebuilt)
import { loadPyodide } from './pyodide.mjs';

/**
 * Python that runs the koan in the global koan_source: parses it, rewrites its asserts and
 * pytest.raises blocks, and runs it as the file "<exec>". An error the koan doesn't catch is printed
 * as a traceback, whose first "<exec>" frame is the koan's line. Sets _koan_rc to the exit code.
 */
const RUN_KOAN = String.raw`
import ast as _ast, sys as _sys, traceback as _traceback

class _KoanRewriter(_ast.NodeTransformer):
    def __init__(self, lines):
        self.lines = lines

    def has_blank(self, node):
        return any(isinstance(n, _ast.Name) and n.id == "___" for n in _ast.walk(node))

    def comment(self, lineno):
        # The comment at the end of a line, if any: a with block's description.
        text = self.lines[lineno - 1] if lineno <= len(self.lines) else ""
        if "#" not in text:
            return None
        return text.rsplit("#", 1)[1].strip() or None

    def call(self, name, args):
        return _ast.Call(_ast.Name(name, _ast.Load()), args, [])

    def visit_Assert(self, node):
        line = _ast.Constant(node.lineno)
        msg = node.msg or _ast.Constant(None)
        test = node.test
        if self.has_blank(node):
            call = self.call("_koan_blank", [msg, line])
        elif isinstance(test, _ast.Compare) and len(test.ops) == 1:
            op = _ast.Constant(type(test.ops[0]).__name__)
            call = self.call("_koan_compare", [test.left, op, test.comparators[0], msg, line])
        else:
            call = self.call("_koan_truth", [test, msg, line])
        return _ast.copy_location(_ast.Expr(call), node)

    def visit_With(self, node):
        self.generic_visit(node)
        desc = _ast.Constant(self.comment(node.lineno))
        line = _ast.Constant(node.lineno)
        if any(self.has_blank(item.context_expr) for item in node.items):
            return _ast.copy_location(_ast.Expr(self.call("_koan_blank", [desc, line])), node)
        for item in node.items:
            expr = item.context_expr
            if isinstance(expr, _ast.Call) and isinstance(expr.func, _ast.Attribute) and expr.func.attr == "raises":
                expr.keywords += [_ast.keyword("_line", line), _ast.keyword("_desc", desc)]
        return node

def _koan_main():
    try:
        tree = _ast.parse(koan_source, "<exec>")
    except SyntaxError:
        _traceback.print_exc()
        return 1
    tree = _ast.fix_missing_locations(_KoanRewriter(koan_source.split("\n")).visit(tree))
    try:
        exec(compile(tree, "<exec>", "exec"), globals())
        return 0
    except BaseException:
        _traceback.print_exc()
        return 1
    finally:
        _sys.stdout.flush()
        _sys.stderr.flush()

_koan_rc = _koan_main()
`;

/** A runner on this Pyodide: each run gets fresh globals, so nothing a koan defines leaks into the next. */
export function makeRunner(py) {
  let lines = null;
  py.setStdout({ batched: text => lines?.push({ stream: 'out', text }) });
  py.setStderr({ batched: text => lines?.push({ stream: 'err', text }) });
  return function run(src) {
    lines = [];
    const globals = py.globals.get('dict')();
    globals.set('__name__', '__main__');
    globals.set('koan_source', src);
    try {
      py.runPython(RUN_KOAN, { globals, filename: '<koan-runner>' });
      return { rc: globals.get('_koan_rc') ?? 1, lines };
    } catch (error) {
      // A failure below Python (the stack ran out, say) can leave the interpreter broken.
      return { rc: -1, lines, crash: String(error?.message ?? error) };
    } finally {
      try {
        globals.destroy();
      } catch {
        /* the interpreter it belonged to is gone */
      }
      lines = null;
    }
  };
}

/**
 * Takes from this worker what koan code must never reach: the site's saved files (caches), the
 * learner's saved progress (indexedDB), and the channel open tabs sync it over (BroadcastChannel),
 * all shared with the page. Koans don't need them, and code from a shared link could otherwise
 * rewrite the site's offline copy or the learner's progress. Run once the interpreter has loaded,
 * before any koan. Removed from the global object and every prototype above it, so they can't be
 * found again; if one can't be removed, this throws rather than run koans with it.
 */
function lockDown(scope = globalThis) {
  for (const name of ['caches', 'indexedDB', 'BroadcastChannel']) {
    for (let o = scope; o; o = Object.getPrototypeOf(o)) Reflect.deleteProperty(o, name);
    if (name in scope) throw new Error(`could not remove ${name} from the worker`);
  }
}

// In a browser worker: load Pyodide from this folder, then answer the page.
if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope && self.location.href === import.meta.url) {
  const start = async () => {
    const py = await loadPyodide({ indexURL: new URL('./', import.meta.url).href });
    lockDown();
    return { py, run: makeRunner(py) };
  };
  let ready = start();
  ready.then(
    ({ py }) => self.postMessage({ type: 'ready', version: `Pyodide ${py.version}` }),
    error => self.postMessage({ type: 'loaderror', message: String(error) }),
  );
  self.onmessage = async ({ data }) => {
    if (data.type !== 'run') return;
    const { run } = await ready;
    const { rc, lines, crash } = run(data.src);
    if (crash) {
      self.postMessage({ type: 'crash', id: data.id, message: crash, lines });
      ready = start();
    } else {
      self.postMessage({ type: 'done', id: data.id, rc, lines });
    }
  };
}
