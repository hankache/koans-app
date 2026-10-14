// JavaScript for the build tools: where its koans live, how they're wrapped, and how to run them
// under Node with the browser worker's own code (public/runtime/javascript/worker.js), so CI
// checks koans the way the browser runs them.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('./', import.meta.url));
const runtimeDir = fileURLToPath(new URL('../../public/runtime/javascript/', import.meta.url));

/** @type {import('../../scripts/lib/languages.mjs').Language} */
export default {
  id: 'javascript',
  name: 'JavaScript',
  dir,
  extension: '.js',
  comment: '//',

  /** prelude.js without its comments: one line, so the koan's line numbers shift by exactly one. */
  prelude() {
    return readFileSync(dir + 'prelude.js', 'utf8')
      .split('\n')
      .filter(l => l.trim() && !l.trim().startsWith('//'))
      .join(' ') + '\n';
  },
  // Closes the async function the prelude opens; the worker waits for it.
  epilogue: '\n})()\n',

  /** console.assert prints and carries on without a test result, so a blank in it is never checked. */
  lint(code) {
    return code.split('\n').flatMap((l, i) =>
      /\bconsole\.assert\(/.test(l) ? [`line ${i + 1} uses console.assert; use assert.ok, assert.equal, …`] : [],
    );
  },

  /**
   * JavaScript runs on the browser's own engine: the only file to fetch is the Acorn parser,
   * which the worker loads to find the line of a syntax error.
   */
  runtime: {
    kind: 'npm',
    package: 'acorn',
    files: ['dist/acorn.mjs'],
    out: runtimeDir,
  },

  async load() {
    let run;
    try {
      ({ run } = await import(runtimeDir + 'worker.js'));
    } catch (e) {
      throw new Error(`JavaScript worker failed to load: ${e.message}`);
    }
    return { version: `Node ${process.versions.node} (V8 ${process.versions.v8})`, run };
  },
};
