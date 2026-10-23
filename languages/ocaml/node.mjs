// OCaml for the build tools: where its koans live, how they're wrapped and checked, and how to run
// them under Node with the browser worker's own code (public/runtime/ocaml/worker.js), on the same
// toplevel, so CI checks koans the way the browser runs them.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { CMIS } from '../../public/runtime/ocaml/worker.js';

const dir = fileURLToPath(new URL('./', import.meta.url));
const runtimeDir = fileURLToPath(new URL('../../public/runtime/ocaml/', import.meta.url));
const ASSET = 'playground/asset/';

/** @type {import('../../scripts/lib/languages.mjs').Language} */
export default {
  id: 'ocaml',
  name: 'OCaml',
  dir,
  extension: '.ml',
  comment: '(*',
  commentEnd: '*)',

  /**
   * prelude.ml without its comment lines, joined onto ONE line, so the koan's line numbers shift by
   * exactly one. OCaml needs no newlines between items. The worker runs line 1 first, on its own.
   */
  prelude() {
    return readFileSync(dir + 'prelude.ml', 'utf8')
      .split('\n')
      .map(l => l.trim())
      .filter(l => l && !l.startsWith('(*'))
      .join(' ') + '\n';
  },
  epilogue: '\n',

  /** A blank belongs to a check: on the line where its check or check_raises is called. */
  lint(code) {
    return code.split('\n').flatMap((l, i) =>
      l.includes('___') && !/\bcheck(_raises)?\b/.test(l) ? [`line ${i + 1} has a blank outside a check`] : [],
    );
  },

  /**
   * The toplevel of ocaml.org's playground, committed to its repository (published nowhere else):
   * worker.min.js and the standard library's interfaces it reads.
   */
  runtime: {
    kind: 'github-files',
    repo: 'ocaml/ocaml.org',
    path: ASSET,
    files: [`${ASSET}worker.min.js`, ...CMIS.map(file => ASSET + file)],
    strip: ASSET,
    out: runtimeDir,
  },

  async load() {
    let makeRunner, startToplevel, withPrelude, script, files;
    try {
      ({ makeRunner, startToplevel, withPrelude } = await import(runtimeDir + 'worker.js'));
      script = new vm.Script(readFileSync(runtimeDir + 'worker.min.js', 'utf8'), { filename: 'worker.min.js' });
      files = CMIS.map(file => [file, readFileSync(runtimeDir + file)]);
    } catch (e) {
      throw new Error(`OCaml runtime missing — run \`npm run fetch-runtime\` first. (${e.message})`);
    }
    // One context for every run: each run evaluates worker.min.js in it again, which starts a
    // fresh toplevel, as in the browser's worker. Values passed in are made in its realm.
    const context = vm.createContext({ console: { log() {}, warn() {}, error() {} } });
    const [Uint8ArrayThere, JSONThere] = vm.runInContext('[Uint8Array, JSON]', context);
    const cmis = new Map(files.map(([file, bytes]) => [file, new Uint8ArrayThere(bytes).buffer]));
    context.self = context;
    context.postMessage = () => {};
    const fresh = () => startToplevel(context, () => script.runInContext(context), cmis, JSONThere.parse);
    const { version } = fresh();
    return { version, run: makeRunner(prelude => withPrelude(fresh(), prelude)) };
  },
};
