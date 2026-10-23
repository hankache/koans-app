// Runs Scheme koans on Stak: a small R7RS Scheme, written in Rust and compiled to WebAssembly. In
// the browser this is a module worker; under Node, the build tools import makeRunner() from it
// (languages/scheme/node.mjs), so the checker and the tests use this same code.
//
// Stak runs a whole program and hands back its output at the end, losing it if the program fails,
// and its errors carry no line. So before a koan runs, it's rewritten (see rewrite() below): each
// top-level form runs through the prelude's %run, which reports an uncaught error with its line and
// keeps the output so far, and each test call learns its own line. Every run is a fresh program,
// so definitions a koan makes can't leak into the next run.
//
// Protocol:  in  { type: 'run', id, src }
//            out { type: 'ready', version } | { type: 'loaderror', message }
//                { type: 'done', id, rc, lines: [{ stream, text }] }

/** How much memory a run gets, in Stak's heap cells: deep recursion runs out of it, not the tab. */
const HEAP = 2 ** 22;

/** The SRFI 64 tests the prelude defines as %test-equal and so on, taking a line and a blank flag. */
const TESTS = new Set(['test-equal', 'test-eqv', 'test-eq', 'test-assert', 'test-error', 'test-group']);

/** Top-level forms that must stay at the top level: they define things the rest of the koan sees. */
const DEFINITIONS = new Set(['import', 'begin', 'define-syntax', 'define-record-type', 'define-values', 'define-library']);

class SchemeSyntaxError extends Error {
  constructor(message, line) {
    super(message);
    this.line = line;
  }
}

/**
 * Reads the program as Scheme data, just enough to rewrite it without changing a line:
 *   (test-equal "why" ___ x)  →  (%test-equal 3 #t "why" ___ x)      its line, and whether it holds a blank
 *   (display x)               →  (%run 4 (lambda () (display x)))    a top-level expression
 *   (define v (f))            →  (define v (%value 5 (lambda () (f))))
 * Forms on line 1, the prelude, are left as they are. Unbalanced parentheses and unterminated
 * strings throw a SchemeSyntaxError with their line, which Stak itself wouldn't give.
 */
export function rewrite(src) {
  let i = 0;
  let line = 1;
  const edits = [];
  const blanks = [];

  const isDelimiter = c => c === undefined || /[\s()";|]/.test(c);
  const advance = () => {
    if (src[i] === '\n') line++;
    i++;
  };

  function skipAtmosphere() {
    for (;;) {
      if (i >= src.length) return;
      const c = src[i];
      if (/\s/.test(c)) advance();
      else if (c === ';') while (i < src.length && src[i] !== '\n') i++;
      else if (src.startsWith('#|', i)) {
        const from = line;
        let depth = 0;
        do {
          if (src.startsWith('#|', i)) { depth++; i += 2; }
          else if (src.startsWith('|#', i)) { depth--; i += 2; }
          else if (i >= src.length) throw new SchemeSyntaxError('unterminated #| comment', from);
          else advance();
        } while (depth > 0);
      } else if (src.startsWith('#;', i)) {
        i += 2;
        if (!read(true)) throw new SchemeSyntaxError('#; with nothing after it', line);
      } else return;
    }
  }

  /** One datum, or null at the end of the text. In quoted data, nothing is rewritten. */
  function read(quoted) {
    skipAtmosphere();
    if (i >= src.length) return null;
    const start = i;
    const from = line;
    const c = src[i];
    if (c === ')') throw new SchemeSyntaxError('unexpected )', line);
    if (c === "'" || c === '`' || c === ',') {
      i += src.startsWith(',@', i) ? 2 : 1;
      const inner = read(c !== ',');
      if (!inner) throw new SchemeSyntaxError(`${c} with nothing after it`, from);
      return { start, end: inner.end, line: from };
    }
    const open = c === '(' ? 1 : src.startsWith('#(', i) ? 2 : src.startsWith('#u8(', i) ? 4 : 0;
    if (open) {
      i += open;
      const children = [];
      for (;;) {
        skipAtmosphere();
        if (i >= src.length) throw new SchemeSyntaxError('missing ) for the ( opened here', from);
        if (src[i] === ')') { i++; break; }
        children.push(read(quoted));
      }
      const node = { start, end: i, line: from, children, head: open === 1 ? children[0]?.symbol : undefined };
      if (!quoted && TESTS.has(node.head)) {
        const blank = blanks.some(at => at > start && at < node.end);
        edits.push([children[0].start, children[0].end, `%${node.head} ${from} ${blank ? '#t' : '#f'}`]);
      }
      return node;
    }
    if (c === '"') {
      i++;
      while (src[i] !== '"') {
        if (i >= src.length) throw new SchemeSyntaxError('unterminated string', from);
        if (src[i] === '\\') i++;
        advance();
      }
      i++;
      return { start, end: i, line: from };
    }
    if (c === '|') {
      i++;
      while (src[i] !== '|') {
        if (i >= src.length) throw new SchemeSyntaxError('unterminated |symbol|', from);
        advance();
      }
      i++;
      return { start, end: i, line: from };
    }
    if (src.startsWith('#\\', i)) {
      i += 3;
      while (!isDelimiter(src[i])) i++;
      return { start, end: i, line: from };
    }
    while (!isDelimiter(src[i])) i++;
    const text = src.slice(start, i);
    if (text === '___') blanks.push(start);
    return { start, end: i, line: from, symbol: text };
  }

  for (let form; (form = read(false)); ) {
    if (form.line === 1 || DEFINITIONS.has(form.head)) continue;
    const [, name, value] = form.children ?? [];
    if (form.head === 'define') {
      if (name?.symbol && value) {
        edits.push([value.start, value.start, `(%value ${value.line} (lambda () `], [value.end, value.end, '))']);
      }
      continue;
    }
    edits.push([form.start, form.start, `(%run ${form.line} (lambda () `], [form.end, form.end, '))']);
  }

  let out = src;
  for (const [from, to, text] of edits.sort((a, b) => b[0] - a[0] || b[1] - a[1])) {
    out = out.slice(0, from) + text + out.slice(to);
  }
  return out;
}

/**
 * A runner on Stak: its run(source, input, heap) function. The prelude marks the lines it writes:
 * character 1 for diagnostics, which go to standard error, and character 2 for an uncaught error,
 * "line message", reported as the message and "    at koan.scm:line".
 */
export function makeRunner(stak) {
  return function run(src) {
    const lines = [];
    const err = text => lines.push({ stream: 'err', text });
    let program;
    try {
      program = rewrite(src);
    } catch (error) {
      if (!(error instanceof SchemeSyntaxError)) throw error;
      err(`syntax error: ${error.message}`);
      err(`    at koan.scm:${error.line}`);
      return { rc: 1, lines };
    }
    let output;
    try {
      output = new TextDecoder().decode(stak(program, new Uint8Array(), HEAP));
    } catch (error) {
      // An error outside any form we could wrap, or one Stak finds before running: its message ends
      // with Stak's own trace, in brackets.
      err(String(error?.message ?? error).trim().replace(/\s*\[[^\]]*\]$/, ''));
      return { rc: 1, lines };
    }
    let rc = 0;
    for (const text of output ? output.replace(/\n$/, '').split('\n') : []) {
      if (text.startsWith('\x01')) err(text.slice(1));
      else if (text.startsWith('\x02')) {
        const [, at, message] = text.slice(1).match(/^(\d+) ([\s\S]*)$/);
        err(message);
        err(`    at koan.scm:${at}`);
        rc = 1;
      } else lines.push({ stream: 'out', text });
    }
    return { rc, lines };
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

// In a browser worker: load Stak's module and its WebAssembly, then answer the page.
if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope && self.location.href === import.meta.url) {
  const ready = (async () => {
    const stak = await import(new URL('./stak_wasm.js', import.meta.url).href);
    await stak.default({ module_or_path: new URL('./stak_wasm_bg.wasm', import.meta.url) });
    const run = makeRunner(stak.run);
    lockDown();
    return run;
  })();
  ready.then(
    () => self.postMessage({ type: 'ready', version: 'Stak Scheme' }),
    error => self.postMessage({ type: 'loaderror', message: String(error) }),
  );
  self.onmessage = async ({ data }) => {
    if (data.type !== 'run') return;
    const run = await ready;
    self.postMessage({ type: 'done', id: data.id, ...run(data.src) });
  };
}
