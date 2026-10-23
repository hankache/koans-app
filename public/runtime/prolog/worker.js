// Runs Prolog koans on SWI-Prolog, compiled to WebAssembly (the swipl-wasm package). In the
// browser this is a module worker; under Node, the build tools import makeRunner() from it
// (languages/prolog/node.mjs), so the checker and the tests use this same code.
//
// Every run gets a fresh SWI-Prolog (about 50 ms: its WebAssembly is compiled once, and its
// library files are handed over from memory), so clauses and facts a koan adds can't leak into
// the next run.
//
// Protocol:  in  { type: 'run', id, src }
//            out { type: 'ready', version } | { type: 'loaderror', message }
//                { type: 'done', id, rc, lines: [{ stream, text }] }

/**
 * A runner on SWI-Prolog. start({ out, err }) starts a fresh one whose standard output and
 * standard error go, line by line, to out and err, and resolves to its Emscripten module.
 *
 * The program, prelude and koan, is written to /koan.pl and consulted; then the prelude's
 * koan_run_tests runs the tests. An error while loading (a syntax error, or a directive that
 * raised) stops the koan, reported as its message and "    at koan.pl:line"; warnings are left
 * out. The prelude marks its diagnostic lines with character 1, to go to standard error.
 */
export function makeRunner(start) {
  return async function run(src) {
    const out = [];
    const err = [];
    const prolog = await start({ out: text => out.push(text), err: text => err.push(text) });
    const query = goal => prolog.prolog.query(goal).once();
    let halted = false;
    let thrown = null;
    try {
      prolog.FS.writeFile('/koan.pl', src);
      query("consult('/koan.pl')");
      query('flush_output');
      if (!loadError(err)) {
        query('koan_run_tests');
        query('flush_output');
      }
    } catch (error) {
      // halt/0 ends the program: Emscripten reports it as an ExitStatus. Anything else got out of
      // Prolog, such as an exception from JavaScript the koan ran with js_run_script; this
      // SWI-Prolog is done for, but every run gets a fresh one.
      if (error?.name === 'ExitStatus') halted = true;
      else thrown = error;
    }

    const lines = [];
    for (const text of out) {
      if (text.startsWith('\x01')) lines.push({ stream: 'err', text: text.slice(1) });
      else lines.push({ stream: 'out', text });
    }
    const error = loadError(err);
    if (error) {
      lines.push({ stream: 'err', text: error.message }, { stream: 'err', text: `    at koan.pl:${error.line}` });
      return { rc: 1, lines };
    }
    if (thrown) {
      lines.push({ stream: 'err', text: String(thrown?.message ?? thrown) });
      return { rc: 1, lines };
    }
    if (halted) {
      lines.push({ stream: 'err', text: 'the program was stopped by halt' });
      return { rc: 1, lines };
    }
    return { rc: 0, lines };
  };
}

/**
 * The first error SWI-Prolog printed while loading /koan.pl, as { line, message }:
 *   ERROR: [Thread main] /koan.pl:3:6: Syntax error: Operator expected
 *   ERROR: /koan.pl:5:
 *   ERROR:    Arithmetic: evaluation error: zero_divisor
 */
function loadError(err) {
  const at = err.findIndex(text => /^ERROR:.*\/koan\.pl:\d+/.test(text));
  if (at < 0) return null;
  const [, line, rest] = err[at].match(/\/koan\.pl:(\d+)(?::\d+)?:\s*(.*)$/);
  let message = rest.trim();
  for (let i = at + 1; !message && i < err.length && /^ERROR:\s/.test(err[i]); i++) {
    message = err[i].replace(/^ERROR:\s*/, '').trim();
  }
  return { line: Number(line), message: message || 'error' };
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

// In a browser worker: fetch SWI-Prolog's script, WebAssembly and library files once, start a
// fresh SWI-Prolog for each run, and answer the page.
if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope && self.location.href === import.meta.url) {
  const ready = (async () => {
    const get = async file => {
      const response = await fetch(new URL(file, import.meta.url));
      if (!response.ok) throw new Error(`${file}: HTTP ${response.status}`);
      return response;
    };
    const [script, wasm, data] = await Promise.all([
      get('swipl-web.js').then(r => r.text()),
      get('swipl-web.wasm').then(r => r.arrayBuffer()).then(bytes => WebAssembly.compile(bytes)),
      get('swipl-web.data').then(r => r.arrayBuffer()),
    ]);
    // swipl-web.js is a script that defines SWIPL, a function starting a fresh SWI-Prolog.
    (0, eval)(`${script}\n//# sourceURL=swipl-web.js`);
    const start = ({ out, err }) =>
      globalThis.SWIPL({
        arguments: ['-q'],
        print: out,
        printErr: err,
        getPreloadedPackage: () => data.slice(0),
        instantiateWasm: (imports, done) => {
          WebAssembly.instantiate(wasm, imports).then(instance => done(instance));
          return {};
        },
      });
    const first = await start({ out() {}, err() {} });
    const version = first.prolog.query('current_prolog_flag(version, V)').once().V;
    lockDown();
    return { run: makeRunner(start), version: `SWI-Prolog ${Math.floor(version / 10000)}.${Math.floor(version / 100) % 100}.${version % 100}` };
  })();
  ready.then(
    ({ version }) => self.postMessage({ type: 'ready', version }),
    error => self.postMessage({ type: 'loaderror', message: String(error) }),
  );
  self.onmessage = async ({ data }) => {
    if (data.type !== 'run') return;
    const { run } = await ready;
    self.postMessage({ type: 'done', id: data.id, ...(await run(data.src)) });
  };
}
