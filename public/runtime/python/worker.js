// Runs Pyodide (CPython compiled to WebAssembly) off the main thread, so a long-running koan can't
// freeze the page, and the page can kill a runaway one by terminating us. A module worker:
// Pyodide's loader is an ES module.
//
// Protocol:  in  { type: 'run', id, src }
//            out { type: 'ready', version } | { type: 'loaderror', message }
//                { type: 'done', id, rc, lines: [{ stream, text }] }
//                { type: 'crash', id, message, lines }   (interpreter rebuilt)
import { loadPyodide } from './pyodide.mjs';

let py = null;
let lines = null; // collecting output only while a run is in progress

async function start() {
  const p = await loadPyodide({ indexURL: new URL('./', import.meta.url).href });
  p.setStdout({ batched: text => (lines ? lines.push({ stream: 'out', text }) : console.log(text)) });
  p.setStderr({ batched: text => (lines ? lines.push({ stream: 'err', text }) : console.warn(text)) });
  return (py = p);
}

let ready = start()
  .then(p => self.postMessage({ type: 'ready', version: `Pyodide ${p.version}` }))
  .catch(err => self.postMessage({ type: 'loaderror', message: String(err) }));

self.onmessage = async ({ data }) => {
  if (data.type !== 'run') return;
  await ready;
  if (!py) return self.postMessage({ type: 'loaderror', message: 'Pyodide failed to load' });

  lines = [];
  // Each run gets fresh globals, so nothing a koan defines leaks into the next run.
  const globals = py.globals.get('dict')();
  globals.set('__name__', '__main__');
  try {
    py.runPython(data.src, { globals });
    self.postMessage({ type: 'done', id: data.id, rc: 0, lines });
  } catch (err) {
    if (err instanceof py.ffi.PythonError) {
      // An exception the koan didn't catch: its traceback is the error output.
      for (const text of String(err.message).replace(/\n+$/, '').split('\n')) lines.push({ stream: 'err', text });
      self.postMessage({ type: 'done', id: data.id, rc: 1, lines });
    } else {
      // A JavaScript-level failure can leave the interpreter broken: report it and start a new one.
      self.postMessage({ type: 'crash', id: data.id, message: String(err), lines });
      py = null;
      ready = start().catch(() => {});
    }
  } finally {
    try {
      globals.destroy();
    } catch {
      /* the interpreter it belonged to is gone */
    }
    lines = null;
  }
};
