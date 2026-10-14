// Raku for the build tools: where its koans live, how they're wrapped and checked, and how to
// run Raku.js (Raku++ compiled to WebAssembly) under Node, so CI checks koans against the
// exact engine the browser uses.
import { readFileSync } from 'node:fs';
import { runInThisContext } from 'node:vm';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('./', import.meta.url));
const runtimeDir = fileURLToPath(new URL('../../public/runtime/raku/', import.meta.url));

/** @type {import('../../scripts/lib/languages.mjs').Language} */
export default {
  id: 'raku',
  name: 'Raku',
  dir,
  extension: '.raku',
  comment: '#',

  /**
   * prelude.raku folded onto ONE line, so error line numbers shift by exactly one.
   * Comment lines are dropped, which is why the prelude can't have trailing # comments.
   */
  prelude() {
    return readFileSync(dir + 'prelude.raku', 'utf8')
      .split('\n')
      .map(l => l.trim())
      .filter(l => l && !l.startsWith('#'))
      .join(' ') + '\n';
  },
  // Closes the block the prelude opens (see prelude.raku).
  epilogue: '\n}\ndone-testing;\n',

  /**
   * Koan problems the run can't catch. Types must be compared with is-deeply: `is` compares
   * strings, and every type object stringifies to '', so `is $x.WHAT, Int` accepts any type.
   */
  lint(code) {
    const weak = code.split('\n').findIndex(l => /^\s*is\s.*\.WHAT\b/.test(l));
    return weak < 0 ? [] : [`line ${weak + 1} compares a type with is; use is-deeply`];
  },

  /** Raku.js from the official Raku++ releases: a zip with a published .sha256 beside it. */
  runtime: {
    repo: 'ash/rakupp',
    asset: tag => `rakujs-${tag}.zip`,
    files: ['rakujs.js', 'rakujs.wasm'],
    out: runtimeDir,
  },

  async load() {
    let RakuJS, wasm;
    try {
      // rakujs.js is a classic script defining a global factory; our package is
      // "type": "module", so evaluate it as a script rather than require() it.
      RakuJS = runInThisContext(readFileSync(runtimeDir + 'rakujs.js', 'utf8') + '\n;RakuJS', {
        filename: 'rakujs.js',
      });
      wasm = readFileSync(runtimeDir + 'rakujs.wasm');
    } catch {
      throw new Error('Raku.js runtime missing — run `npm run fetch-runtime` first.');
    }

    // The published build is web-only: it fetches its .wasm over HTTP. We bypass that
    // with Emscripten's `instantiateWasm` hook and hand it the bytes from disk.
    let sink = null;
    const mod = await RakuJS({
      instantiateWasm(imports, done) {
        WebAssembly.instantiate(wasm, imports).then(r => done(r.instance, r.module));
        return {};
      },
      print: t => sink?.push({ stream: 'out', text: t }),
      printErr: t => sink?.push({ stream: 'err', text: t }),
    });

    return {
      version: mod.ccall('rakupp_version', 'string', [], []),
      /** Runs a whole program synchronously; returns exit code and output lines. */
      run(src, stdin = '') {
        sink = [];
        try {
          const rc = mod.ccall('rakupp_run', 'number', ['string', 'string'], [src, stdin]);
          return { rc, lines: sink };
        } finally {
          sink = null;
        }
      },
    };
  },
};
