// LANGUAGE for the build tools: where its koans live, how they're wrapped and checked, and how to
// run them under Node with the same interpreter the browser uses.
// Copied from languages/_template: replace every LANGUAGE, lang-id and TODO.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('./', import.meta.url));
const runtimeDir = fileURLToPath(new URL('../../public/runtime/lang-id/', import.meta.url));

/** @type {import('../../scripts/lib/languages.mjs').Language} */
export default {
  id: 'lang-id',
  name: 'LANGUAGE',
  dir,
  extension: '.ext', // TODO: the koan files' extension
  comment: '#', // TODO: what starts a comment line, for the koans' "title:" and "intro:" lines

  /**
   * TODO: the prelude as ONE line, so the koan's line numbers shift by exactly one. Either fold
   * prelude.ext onto one line (Raku, JavaScript) or wrap it in a one-line eval (Python).
   */
  prelude() {
    return readFileSync(dir + 'prelude.ext', 'utf8')
      .split('\n')
      .filter(l => l.trim() && !l.trim().startsWith('#'))
      .join(' ') + '\n';
  },
  // TODO: what closes whatever the prelude opens, if anything.
  epilogue: '\n',

  /** TODO: problems in a koan that running it can't reveal (Python: a plain assert). */
  lint(code) {
    return [];
  },

  /**
   * TODO: where the interpreter comes from. Either a zip attached to GitHub releases, with a
   * .sha256 beside it (Raku):
   *   { repo: 'owner/project', asset: tag => `name-${tag}.zip`, files: [...], out: runtimeDir }
   * or an npm package in package.json (Python, JavaScript):
   *   { kind: 'npm', package: 'name', files: [...paths in the package], out: runtimeDir }
   * Then: npm run fetch-runtime -- --lang lang-id --update
   */
  runtime: {
    kind: 'npm',
    package: 'TODO',
    files: [],
    out: runtimeDir,
  },

  /**
   * TODO: load the interpreter under Node. run(src) runs prelude + koan + epilogue in a fresh
   * state and returns { rc, lines: [{ stream: 'out' | 'err', text }] } (or a promise of it):
   * stdout and stderr lines in the order they were written; rc 0 unless the program died.
   */
  async load() {
    throw new Error('TODO: load LANGUAGE under Node');
  },
};
