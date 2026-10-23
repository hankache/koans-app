// Runs LANGUAGE koans off the main thread. Copy to public/runtime/lang-id/worker.js;
// `npm run fetch-runtime` puts the interpreter's files beside it.
//
// Protocol (src/lib/runtime/wasm-runtime.ts):
//   in  { type: 'run', id, src }
//   out { type: 'ready', version } | { type: 'loaderror', message }
//       { type: 'done', id, rc, lines: [{ stream: 'out' | 'err', text }] }
//       { type: 'crash', id, message, lines }   (after a failure that leaves the interpreter broken)
//
// The page kills the worker after 8 seconds and starts a new one, so a run never has to stop itself.

let interpreter = null;
let lines = null; // collecting output only while a run is in progress

async function start() {
  // TODO: load the interpreter from this folder, sending its stdout and stderr, line by line, to
  // lines?.push({ stream: 'out' | 'err', text }).
  return (interpreter = null);
}

/**
 * Takes from this worker what koan code must never reach: the site's saved files (caches), the
 * learner's saved progress (indexedDB), and the channel open tabs sync it over (BroadcastChannel),
 * all shared with the page. Koans don't need them, and code from a shared link could otherwise
 * rewrite the site's offline copy or the learner's progress. Run once the interpreter has loaded,
 * before any koan. Keep it: tests/browser/run.mjs checks that koan code can't reach them, for
 * every language with a bridge to JavaScript (add yours to REACH there).
 */
function lockDown(scope = globalThis) {
  for (const name of ['caches', 'indexedDB', 'BroadcastChannel']) {
    for (let o = scope; o; o = Object.getPrototypeOf(o)) Reflect.deleteProperty(o, name);
    if (name in scope) throw new Error(`could not remove ${name} from the worker`);
  }
}

let ready = start()
  .then(() => {
    lockDown();
    self.postMessage({ type: 'ready', version: 'TODO' });
  })
  .catch(err => self.postMessage({ type: 'loaderror', message: String(err) }));

self.onmessage = async ({ data }) => {
  if (data.type !== 'run') return;
  await ready;
  lines = [];
  try {
    // TODO: run data.src in a fresh state, so nothing leaks from one run into the next. An error the
    // program didn't catch goes to stderr, as the interpreter would print it, with rc 1.
    const rc = 0;
    self.postMessage({ type: 'done', id: data.id, rc, lines });
  } catch (err) {
    self.postMessage({ type: 'crash', id: data.id, message: String(err), lines });
    ready = start().catch(() => {});
  } finally {
    lines = null;
  }
};
