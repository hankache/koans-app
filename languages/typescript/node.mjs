// TypeScript for the build tools: where its koans live, how they're wrapped, and how to run them
// under Node with the browser worker's own code (public/runtime/typescript/worker.js), on the same
// TypeScript compiler, so CI checks koans the way the browser runs them.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { runInThisContext } from 'node:vm';

const dir = fileURLToPath(new URL('./', import.meta.url));
const runtimeDir = fileURLToPath(new URL('../../public/runtime/typescript/', import.meta.url));
const require = createRequire(import.meta.url);

/** lib.es2023.d.ts and every library file it refers to, directly or not: what the koans type-check against. */
function libraryFiles() {
  const libDir = fileURLToPath(new URL('./', `file://${require.resolve('typescript/lib/lib.d.ts')}`));
  const found = new Set();
  const visit = name => {
    if (found.has(name)) return;
    found.add(name);
    for (const m of readFileSync(libDir + name, 'utf8').matchAll(/\/\/\/ <reference lib="([^"]+)" \/>/g)) visit(`lib.${m[1].toLowerCase()}.d.ts`);
  };
  visit('lib.es2023.d.ts');
  return [...found].sort().map(name => `lib/${name}`);
}

/** @type {import('../../scripts/lib/languages.mjs').Language} */
export default {
  id: 'typescript',
  name: 'TypeScript',
  dir,
  extension: '.ts',
  comment: '//',

  /** prelude.ts without its comments: one line, so the koan's line numbers shift by exactly one. */
  prelude() {
    return readFileSync(dir + 'prelude.ts', 'utf8')
      .split('\n')
      .filter(l => l.trim() && !l.trim().startsWith('//'))
      .join(' ') + '\n';
  },
  // Closes the async function the prelude opens; the worker waits for it.
  epilogue: '\n})()\n',

  /** Comments that switch the type checker off would hide the very thing the koans teach. */
  lint(code) {
    return code.split('\n').flatMap((l, i) =>
      /@ts-(ignore|nocheck|expect-error)/.test(l) ? [`line ${i + 1} switches type checking off`] : [],
    );
  },

  /** The TypeScript compiler from its npm package, and the library files the koans need. */
  runtime: {
    kind: 'npm',
    package: 'typescript',
    files: ['lib/typescript.js', ...libraryFiles()],
    out: runtimeDir,
  },

  async load() {
    let makeRunner, loadLibs, ts;
    try {
      ({ makeRunner, loadLibs } = await import(runtimeDir + 'worker.js'));
      // typescript.js is a classic script defining a global `ts`; our package is "type": "module",
      // so evaluate it as a script rather than require() it.
      ts = runInThisContext(`${readFileSync(runtimeDir + 'typescript.js', 'utf8')}\n;ts`, { filename: 'typescript.js' });
    } catch (e) {
      throw new Error(`TypeScript runtime missing — run \`npm run fetch-runtime\` first. (${e.message})`);
    }
    const libs = await loadLibs(async name => readFileSync(runtimeDir + name, 'utf8'));
    return { version: `TypeScript ${ts.version} on Node ${process.versions.node}`, run: makeRunner(ts, libs) };
  },
};
