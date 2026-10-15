// PHP for the build tools: where its koans live, how they're wrapped and checked, and how to run
// them under Node with the browser worker's own code (public/runtime/php/worker.js), on the same
// build of php-wasm, so CI checks koans the way the browser runs them.
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const dir = fileURLToPath(new URL('./', import.meta.url));
const runtimeDir = fileURLToPath(new URL('../../public/runtime/php/', import.meta.url));

/** @type {import('../../scripts/lib/languages.mjs').Language} */
export default {
  id: 'php',
  name: 'PHP',
  dir,
  extension: '.php',
  comment: '//',

  /**
   * prelude.php, run by eval() on ONE line that closes PHP mode again, so the koan's line numbers
   * shift by exactly one and the koan starts with its own <?php. (?> eats the newline after it.)
   */
  prelude() {
    const code = readFileSync(dir + 'prelude.php', 'utf8').replace(/^<\?php\s*/, '');
    return `<?php eval(base64_decode('${Buffer.from(code).toString('base64')}')); ?>\n`;
  },
  epilogue: '\n',

  /** A blank belongs to an assertion: on a line that calls one. */
  lint(code) {
    return code.split('\n').flatMap((l, i) =>
      l.includes('___') && !/\bassert[A-Z]\w*\s*\(/.test(l) ? [`line ${i + 1} has a blank outside an assertion`] : [],
    );
  },

  /** php-wasm's npm package holds six versions of PHP (95 MB unpacked), so it isn't installed. */
  runtime: {
    kind: 'npm-tarball',
    package: 'php-wasm',
    files: [
      'PhpBase.mjs',
      'OutputBuffer.mjs',
      '_Event.mjs',
      'fsOps.mjs',
      'resolveDependencies.mjs',
      'php8.5-web.mjs',
      '680a122bfdab5d7d3e949a54f8e97cc99bc7b305.wasm',
      'LICENSE',
      'NOTICE',
    ],
    out: runtimeDir,
  },

  async load() {
    let makeRunner, PHP_BUILD, PHP_WASM, module;
    try {
      ({ makeRunner, PHP_BUILD, PHP_WASM } = await import(pathToFileURL(runtimeDir + 'worker.js').href));
      module = await WebAssembly.compile(readFileSync(runtimeDir + PHP_WASM));
    } catch (e) {
      throw new Error(`PHP runtime missing — run \`npm run fetch-runtime\` first. (${e.message})`);
    }
    const run = makeRunner(import(new URL(PHP_BUILD, pathToFileURL(runtimeDir)).href), module);
    const { lines } = await run('<?php echo PHP_VERSION;');
    return { version: `PHP ${lines[0]?.text ?? ''} (php-wasm)`, run };
  },
};
