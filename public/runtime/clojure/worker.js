// Runs Clojure koans on Scittle: SCI, the Small Clojure Interpreter, compiled to JavaScript. In the
// browser this is a module worker; under Node, the build tools import makeRunner() from it
// (languages/clojure/node.mjs), so the checker and the tests use this same code.
//
// Every run gets a fresh Scittle (about 20 ms), so definitions a koan makes can't leak into the next
// run.
//
// Protocol:  in  { type: 'run', id, src }
//            out { type: 'ready', version } | { type: 'loaderror', message }
//                { type: 'done', id, rc, lines: [{ stream, text }] }

/**
 * A runner on Scittle. fresh({ out, err }) starts a new Scittle whose console writes to out and err,
 * and returns its eval_string.
 */
export function makeRunner(fresh) {
  return function run(src) {
    const lines = [];
    const push = stream => text => {
      for (const t of String(text).replace(/\n$/, '').split('\n')) lines.push({ stream, text: t });
    };
    const evalString = fresh({ out: (...a) => push('out')(a.join(' ')), err: (...a) => push('err')(a.join(' ')) });
    try {
      evalString(src);
      return { rc: 0, lines };
    } catch (error) {
      // Scittle prints its own report of an uncaught error, with "Message:" and "Location: line:col".
      // Keep the message, and the line in the form the app reads: "    at koan.clj:3".
      const at = lines.findIndex(l => l.text.startsWith('----- Scittle error'));
      const report = at < 0 ? [] : lines.splice(at);
      const message = report.find(l => l.text.startsWith('Message:'))?.text.replace(/^Message:\s*/, '')
        ?? String(error?.message ?? error);
      const location = report.find(l => l.text.startsWith('Location:'))?.text.match(/(\d+):\d+/);
      push('err')(message);
      if (location) push('err')(`    at koan.clj:${location[1]}`);
      return { rc: 1, lines };
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

// In a browser worker: fetch Scittle once, start a fresh one for every run, and answer the page.
if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope && self.location.href === import.meta.url) {
  const ready = (async () => {
    const bundle = await fetch(new URL('./scittle.js', import.meta.url));
    if (!bundle.ok) throw new Error(`scittle.js: HTTP ${bundle.status}`);
    const script = `${await bundle.text()}\n//# sourceURL=scittle.js`;
    // Scittle reads a little of the page when it loads: a worker has none, so give it stand-ins.
    self.window = self;
    self.document = { addEventListener() {}, querySelectorAll: () => [], readyState: 'complete' };
    // Scittle prints through the console: send it to the run in progress.
    let sink = null;
    for (const [name, stream] of [['log', 'out'], ['info', 'out'], ['warn', 'err'], ['error', 'err']]) {
      const original = console[name].bind(console);
      console[name] = (...args) => (sink ? sink[stream](...args) : original(...args));
    }
    // Evaluating the bundle again in the same worker gives a fresh Scittle: nothing carries over.
    const fresh = streams => {
      sink = streams;
      (0, eval)(script);
      return globalThis.scittle.core.eval_string;
    };
    const run = makeRunner(fresh);
    run('(+ 1 1)');
    lockDown();
    return run;
  })();
  ready.then(
    () => self.postMessage({ type: 'ready', version: 'Scittle (SCI)' }),
    error => self.postMessage({ type: 'loaderror', message: String(error) }),
  );
  self.onmessage = async ({ data }) => {
    if (data.type !== 'run') return;
    const run = await ready;
    self.postMessage({ type: 'done', id: data.id, ...run(data.src) });
  };
}
