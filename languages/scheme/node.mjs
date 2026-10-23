// Scheme for the build tools: where its koans live, how they're wrapped and checked, and how to run
// them under Node with the browser worker's own code (public/runtime/scheme/worker.js), on the same
// Stak, so CI checks koans the way the browser runs them.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('./', import.meta.url));
const runtimeDir = fileURLToPath(new URL('../../public/runtime/scheme/', import.meta.url));

/** @type {import('../../scripts/lib/languages.mjs').Language} */
export default {
  id: 'scheme',
  name: 'Scheme',
  dir,
  extension: '.scm',
  comment: ';;',

  /**
   * prelude.scm without its comment lines, joined onto ONE line, so the koan's line numbers shift by
   * exactly one. Scheme needs no newlines between forms. The worker counts on the prelude being
   * line 1: it leaves the forms there as they are.
   */
  prelude() {
    return readFileSync(dir + 'prelude.scm', 'utf8')
      .split('\n')
      .map(l => l.trim())
      .filter(l => l && !l.startsWith(';'))
      .join(' ') + '\n';
  },
  epilogue: '\n',

  /** A blank belongs to a test: on the line where its (test-… starts. */
  lint(code) {
    return code.split('\n').flatMap((l, i) => [
      ...(l.includes('___') && !/\(test-(equal|eqv|eq|assert|error)\s/.test(l) ? [`line ${i + 1} has a blank outside a (test-…)`] : []),
      ...(/\(import\s/.test(l) ? [`line ${i + 1} imports: the prelude imports the libraries koans use`] : []),
    ]);
  },

  /** Stak from the npm registry: its module and its WebAssembly. */
  runtime: {
    kind: 'npm-tarball',
    package: '@raviqqe/stak',
    files: ['stak_wasm.js', 'stak_wasm_bg.wasm'],
    out: runtimeDir,
  },

  async load() {
    let makeRunner, stak;
    try {
      ({ makeRunner } = await import(runtimeDir + 'worker.js'));
      stak = await import(runtimeDir + 'stak_wasm.js');
      stak.initSync({ module: readFileSync(runtimeDir + 'stak_wasm_bg.wasm') });
    } catch (e) {
      throw new Error(`Scheme runtime missing — run \`npm run fetch-runtime\` first. (${e.message})`);
    }
    return { version: 'Stak Scheme', run: makeRunner(stak.run) };
  },
};
