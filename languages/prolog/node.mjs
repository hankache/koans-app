// Prolog for the build tools: where its koans live, how they're wrapped and checked, and how to run
// them under Node with the browser worker's own code (public/runtime/prolog/worker.js), on the same
// SWI-Prolog, so CI checks koans the way the browser runs them.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('./', import.meta.url));
const runtimeDir = fileURLToPath(new URL('../../public/runtime/prolog/', import.meta.url));

/** @type {import('../../scripts/lib/languages.mjs').Language} */
export default {
  id: 'prolog',
  name: 'Prolog',
  dir,
  extension: '.pl',
  comment: '%',

  /**
   * prelude.pl without its comment lines, joined onto ONE line, so the koan's line numbers shift by
   * exactly one. Prolog needs no newlines between clauses.
   */
  prelude() {
    return readFileSync(dir + 'prelude.pl', 'utf8')
      .split('\n')
      .map(l => l.trim())
      .filter(l => l && !l.startsWith('%'))
      .join(' ') + '\n';
  },
  epilogue: '\n',

  /** A blank belongs to a test: on the line where its test( starts. */
  lint(code) {
    return code.split('\n').flatMap((l, i) => [
      ...(l.includes('___') && !/^test\(/.test(l) ? [`line ${i + 1} has a blank outside a test(…)`] : []),
      ...(/use_module\(library\(plunit\)\)/.test(l) ? [`line ${i + 1} loads plunit: the prelude provides test/2`] : []),
    ]);
  },

  /** SWI-Prolog from the npm registry: its Emscripten script, WebAssembly and library files. */
  runtime: {
    kind: 'npm-tarball',
    package: 'swipl-wasm',
    files: ['dist/swipl/swipl-web.js', 'dist/swipl/swipl-web.wasm', 'dist/swipl/swipl-web.data'],
    out: runtimeDir,
  },

  async load() {
    let makeRunner, SWIPL, wasm, data;
    try {
      ({ makeRunner } = await import(runtimeDir + 'worker.js'));
      // swipl-web.js is CommonJS, which our "type": "module" package can't require directly, so
      // give it the CommonJS variables it expects.
      const file = runtimeDir + 'swipl-web.js';
      const module = { exports: {} };
      new Function('module', 'exports', 'require', '__dirname', '__filename', readFileSync(file, 'utf8'))(
        module, module.exports, createRequire(file), runtimeDir, file,
      );
      SWIPL = module.exports;
      wasm = new WebAssembly.Module(readFileSync(runtimeDir + 'swipl-web.wasm'));
      data = readFileSync(runtimeDir + 'swipl-web.data');
    } catch (e) {
      throw new Error(`Prolog runtime missing — run \`npm run fetch-runtime\` first. (${e.message})`);
    }
    const start = ({ out, err }) =>
      SWIPL({
        arguments: ['-q'],
        print: out,
        printErr: err,
        getPreloadedPackage: () => data.buffer.slice(data.byteOffset, data.byteOffset + data.length),
        instantiateWasm: (imports, done) => {
          WebAssembly.instantiate(wasm, imports).then(instance => done(instance));
          return {};
        },
      });
    const first = await start({ out() {}, err() {} });
    const v = first.prolog.query('current_prolog_flag(version, V)').once().V;
    return { version: `SWI-Prolog ${Math.floor(v / 10000)}.${Math.floor(v / 100) % 100}.${v % 100}`, run: makeRunner(start) };
  },
};
