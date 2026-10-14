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

  /**
   * The runner checks asserts and pytest.raises blocks, so that's where a blank goes: anywhere else
   * it would just break the koan.
   */
  lint(code) {
    return code.split('\n').flatMap((l, i) =>
      l.includes('___') && !/^\s*(assert\b|with\s+pytest\.raises\()/.test(l)
        ? [`line ${i + 1} has a blank outside an assert or a with pytest.raises(…)`] : [],
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
    let loadPyodide, makeRunner;
    try {
      ({ loadPyodide } = await import(runtimeDir + 'pyodide.mjs'));
      ({ makeRunner } = await import(runtimeDir + 'worker.js'));
    } catch (e) {
      throw new Error(`Pyodide runtime missing — run \`npm run fetch-runtime\` first. (${e.message})`);
    }
    const py = await loadPyodide({ indexURL: runtimeDir });
    const version = `Pyodide ${py.version}, Python ${py.runPython('import sys; sys.version.split()[0]')}`;
    return { version, run: makeRunner(py) };
  },
};
