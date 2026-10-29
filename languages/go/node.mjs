// Go for the build tools: where its koans live, how they're checked, and how to run them under
// Node with the browser worker's own code (public/runtime/go/worker.js), on the same compiler,
// linker and standard library, so CI checks koans the way the browser runs them.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('./', import.meta.url));
const runtimeDir = fileURLToPath(new URL('../../public/runtime/go/', import.meta.url));

/** @type {import('../../scripts/lib/languages.mjs').Language} */
export default {
  id: 'go',
  name: 'Go',
  dir,
  extension: '.go',
  comment: '//',

  /**
   * One comment line. A Go file must start with its package clause, so nothing of ours can come
   * before the koan: the worker compiles a second file beside it, with ___ and a main that runs
   * the koan's tests.
   */
  prelude() {
    return '// koans.app\n';
  },
  epilogue: '\n',

  /** A blank is an answer: an argument of an assert or require call, on that call's line. */
  lint(code) {
    return code.split('\n').flatMap((l, i) =>
      l.includes('___') && !/\b(assert|require)\.\w+\(/.test(l) ? [`line ${i + 1} has a blank outside an assert or require call`] : [],
    );
  },

  /**
   * Go's own compiler and linker, and the standard library packages a koan may import, built for
   * WebAssembly by the official release. testing is the koans' own (support/testing), so nothing
   * here may need Go's.
   */
  runtime: {
    kind: 'go-toolchain',
    packages: [
      'bufio', 'bytes', 'cmp', 'container/heap', 'container/list', 'context', 'encoding/json', 'errors',
      'fmt', 'io', 'iter', 'maps', 'math', 'math/bits', 'math/rand/v2', 'os', 'reflect', 'regexp',
      'runtime', 'runtime/debug', 'slices', 'sort', 'strconv', 'strings', 'sync', 'sync/atomic', 'time',
      'unicode', 'unicode/utf8', 'unique',
    ],
    exclude: ['testing'],
    out: runtimeDir,
  },

  async load() {
    let startGo;
    try {
      ({ startGo } = await import(runtimeDir + 'worker.js'));
      readFileSync(runtimeDir + 'go.json');
    } catch (e) {
      throw new Error(`Go runtime missing — run \`npm run fetch-runtime\` first. (${e.message})`);
    }
    return startGo(async file => new Uint8Array(readFileSync(runtimeDir + file)));
  },
};
