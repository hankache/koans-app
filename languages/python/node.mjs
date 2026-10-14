// Python for the build tools: where its koans live, how they're wrapped and checked, and how to
// run Pyodide (CPython compiled to WebAssembly) under Node, so CI checks koans against the exact
// engine the browser uses.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('./', import.meta.url));
const runtimeDir = fileURLToPath(new URL('../../public/runtime/python/', import.meta.url));

/** @type {import('../../scripts/lib/languages.mjs').Language} */
export default {
  id: 'python',
  name: 'Python',
  dir,
  extension: '.py',
  comment: '#',

  /**
   * prelude.py run by exec() on ONE line, so error line numbers shift by exactly one. Python
   * can't be folded onto one line the way Raku can, but a string literal can hold all of it.
   * (JSON's string escapes are all valid in Python.)
   */
  prelude() {
    return `exec(${JSON.stringify(readFileSync(dir + 'prelude.py', 'utf8'))})\n`;
  },
  // A blank line ends any block the koan leaves open.
  epilogue: '\n',

  /** A plain assert stops the koan at its first failure, so later blanks could never be checked. */
  lint(code) {
    return code.split('\n').flatMap((l, i) =>
      /^\s*assert\s/.test(l) ? [`line ${i + 1} uses a plain assert; use assert_true, assert_equal, …`] : [],
    );
  },

  /** Pyodide's npm package, pinned by package-lock.json: the files it needs to run Python. */
  runtime: {
    kind: 'npm',
    package: 'pyodide',
    // pyodide.mjs names its source map, so it comes along for the browser's developer tools.
    files: ['pyodide.mjs', 'pyodide.mjs.map', 'pyodide.asm.mjs', 'pyodide.asm.wasm', 'python_stdlib.zip', 'pyodide-lock.json'],
    out: runtimeDir,
  },

  async load() {
    let loadPyodide;
    try {
      ({ loadPyodide } = await import(runtimeDir + 'pyodide.mjs'));
    } catch {
      throw new Error('Pyodide runtime missing — run `npm run fetch-runtime` first.');
    }
    const py = await loadPyodide({ indexURL: runtimeDir });

    let sink = null;
    py.setStdout({ batched: t => sink?.push({ stream: 'out', text: t }) });
    py.setStderr({ batched: t => sink?.push({ stream: 'err', text: t }) });

    return {
      version: `Pyodide ${py.version}, Python ${py.runPython('import sys; sys.version.split()[0]')}`,
      /** Runs a whole program in fresh globals, as the worker does; returns exit code and output lines. */
      run(src) {
        sink = [];
        const globals = py.globals.get('dict')();
        globals.set('__name__', '__main__');
        try {
          py.runPython(src, { globals });
          return { rc: 0, lines: sink };
        } catch (e) {
          // An exception the koan didn't catch: its traceback is the error output.
          for (const text of String(e.message).replace(/\n+$/, '').split('\n')) sink.push({ stream: 'err', text });
          return { rc: 1, lines: sink };
        } finally {
          globals.destroy();
          sink = null;
        }
      },
    };
  },
};
