// SQL for the build tools: where its koans live, what to check in them, and how to run them under
// Node with the browser worker's own code (public/runtime/sql/worker.js), on the same sql.js, so
// CI checks koans the way the browser runs them.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('./', import.meta.url));
const runtimeDir = fileURLToPath(new URL('../../public/runtime/sql/', import.meta.url));

/** @type {import('../../scripts/lib/languages.mjs').Language} */
export default {
  id: 'sql',
  name: 'SQL',
  dir,
  extension: '.sql',
  comment: '--',

  // No prelude: the worker itself turns queries and their -- expect: comments into tests.
  prelude: () => '',
  epilogue: '',

  /**
   * A blank must be in a query with an expectation (elsewhere it would just break the koan), and
   * several expected rows need ORDER BY: without it, SQL doesn't promise an order.
   */
  async lint(code) {
    const { statementsOf } = await import(runtimeDir + 'worker.js');
    return statementsOf(code).flatMap(s => [
      ...(s.text.includes('___') && !s.expect ? [`line ${s.line} has a blank but no -- expect: comment`] : []),
      ...(s.expect && /\)\s*,\s*\(/.test(s.expect.text) && !/\bORDER\s+BY\b/i.test(s.text)
        ? [`line ${s.line} expects several rows but has no ORDER BY`] : []),
    ]);
  },

  /** sql.js from the npm registry (its package holds many builds; two files are needed). */
  runtime: {
    kind: 'npm-tarball',
    package: 'sql.js',
    files: ['dist/sql-wasm.js', 'dist/sql-wasm.wasm'],
    out: runtimeDir,
  },

  async load() {
    let makeRunner, initSqlJs;
    try {
      ({ makeRunner } = await import(runtimeDir + 'worker.js'));
      // sql-wasm.js is CommonJS under Node, which our "type": "module" package can't require
      // directly, so give it the CommonJS variables it expects.
      const file = runtimeDir + 'sql-wasm.js';
      const module = { exports: {} };
      new Function('module', 'exports', 'require', '__dirname', '__filename', readFileSync(file, 'utf8'))(
        module, module.exports, createRequire(file), runtimeDir, file,
      );
      initSqlJs = module.exports;
    } catch (e) {
      throw new Error(`SQL runtime missing — run \`npm run fetch-runtime\` first. (${e.message})`);
    }
    const SQL = await initSqlJs({ locateFile: name => runtimeDir + name });
    const db = new SQL.Database();
    const version = db.exec('SELECT sqlite_version()')[0].values[0][0];
    db.close();
    return { version: `SQLite ${version} (sql.js)`, run: makeRunner(SQL) };
  },
};
