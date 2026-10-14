// Lua for the build tools: where its koans live, how they're wrapped and checked, and how to run
// them under Node with the browser worker's own code (public/runtime/lua/worker.js), on the same
// wasmoon, so CI checks koans the way the browser runs them.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { compileFunction, constants } from 'node:vm';

const dir = fileURLToPath(new URL('./', import.meta.url));
const runtimeDir = fileURLToPath(new URL('../../public/runtime/lua/', import.meta.url));

/** @type {import('../../scripts/lib/languages.mjs').Language} */
export default {
  id: 'lua',
  name: 'Lua',
  dir,
  extension: '.lua',
  comment: '--',

  /**
   * prelude.lua without its comment lines, joined onto ONE line, so the koan's line numbers shift by
   * exactly one. Lua needs no newlines between statements.
   */
  prelude() {
    return readFileSync(dir + 'prelude.lua', 'utf8')
      .split('\n')
      .map(l => l.trim())
      .filter(l => l && !l.startsWith('--'))
      .join(' ') + '\n';
  },
  epilogue: '\n',

  /** Nothing to check beyond what running the koan shows: the prelude replaces Lua's assert with busted's. */
  lint() {
    return [];
  },

  /** wasmoon from the npm registry (small, but it would bring dependencies of its own to install). */
  runtime: {
    kind: 'npm-tarball',
    package: 'wasmoon',
    files: ['dist/index.js', 'dist/glue.wasm'],
    out: runtimeDir,
  },

  async load() {
    let makeRunner, LuaFactory;
    try {
      ({ makeRunner } = await import(runtimeDir + 'worker.js'));
      // index.js is a UMD bundle; under Node it's CommonJS, which our "type": "module" package can't
      // require directly, so give it the CommonJS variables it expects. It also uses import(), which
      // needs a loader wherever the code was compiled (the test runner has none by default).
      const module = { exports: {} };
      const file = runtimeDir + 'index.js';
      compileFunction(readFileSync(file, 'utf8'), ['module', 'exports', 'require', '__dirname', '__filename'], {
        filename: file,
        importModuleDynamically: constants.USE_MAIN_CONTEXT_DEFAULT_LOADER,
      })(module, module.exports, createRequire(file), runtimeDir, file);
      ({ LuaFactory } = module.exports);
    } catch (e) {
      throw new Error(`Lua runtime missing — run \`npm run fetch-runtime\` first. (${e.message})`);
    }
    const run = makeRunner(LuaFactory, runtimeDir + 'glue.wasm');
    const { lines } = await run('print(_VERSION)');
    return { version: `${lines[0]?.text ?? 'Lua'} (wasmoon)`, run };
  },
};
