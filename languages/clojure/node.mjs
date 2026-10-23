// Clojure for the build tools: where its koans live, how they're wrapped and checked, and how to run
// them under Node with the browser worker's own code (public/runtime/clojure/worker.js), on the same
// Scittle, so CI checks koans the way the browser runs them.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const dir = fileURLToPath(new URL('./', import.meta.url));
const runtimeDir = fileURLToPath(new URL('../../public/runtime/clojure/', import.meta.url));

/** @type {import('../../scripts/lib/languages.mjs').Language} */
export default {
  id: 'clojure',
  name: 'Clojure',
  dir,
  extension: '.clj',
  comment: ';;',

  /**
   * prelude.clj without its comment lines, joined onto ONE line, so the koan's line numbers shift by
   * exactly one. Clojure needs no newlines between forms.
   */
  prelude() {
    return readFileSync(dir + 'prelude.clj', 'utf8')
      .split('\n')
      .map(l => l.trim())
      .filter(l => l && !l.startsWith(';'))
      .join(' ') + '\n';
  },
  epilogue: '\n',

  /** A blank belongs to an assertion: on the line where its (is …) starts. */
  lint(code) {
    return code.split('\n').flatMap((l, i) => [
      ...(l.includes('___') && !/\(is\s/.test(l) ? [`line ${i + 1} has a blank outside an (is …)`] : []),
      ...(/clojure\.test/.test(l) ? [`line ${i + 1} requires clojure.test: the prelude provides is, testing and deftest`] : []),
    ]);
  },

  /** Scittle from the npm registry: its package holds plugins and source maps the koans don't need. */
  runtime: {
    kind: 'npm-tarball',
    package: 'scittle',
    files: ['dist/scittle.js'],
    out: runtimeDir,
  },

  async load() {
    let makeRunner, script;
    try {
      ({ makeRunner } = await import(runtimeDir + 'worker.js'));
      script = new vm.Script(readFileSync(runtimeDir + 'scittle.js', 'utf8'), { filename: 'scittle.js' });
    } catch (e) {
      throw new Error(`Clojure runtime missing — run \`npm run fetch-runtime\` first. (${e.message})`);
    }
    // A fresh Scittle for every run, in a context of its own, with the little of a page it reads
    // when it loads; its console goes to the run's output.
    const fresh = ({ out, err }) => {
      const context = { setTimeout, clearTimeout, queueMicrotask, console: { log: out, info: out, error: err, warn: err } };
      context.window = context.globalThis = context.self = context;
      context.document = { addEventListener() {}, querySelectorAll: () => [], readyState: 'complete' };
      vm.createContext(context);
      script.runInContext(context);
      return context.scittle.core.eval_string;
    };
    return { version: 'Scittle (SCI)', run: makeRunner(fresh) };
  },
};
