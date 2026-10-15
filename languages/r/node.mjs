// R for the build tools: where its koans live, how they're wrapped and checked, and how to run
// them under Node with the browser worker's own code (public/runtime/r/worker.js), on the same
// webR, so CI checks koans the way the browser runs them.
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const dir = fileURLToPath(new URL('./', import.meta.url));
const runtimeDir = fileURLToPath(new URL('../../public/runtime/r/', import.meta.url));
// webR's own files, in a folder whose package.json tells Node that webr-worker.js is CommonJS.
const webrDir = runtimeDir + 'webr/';

/** @type {import('../../scripts/lib/languages.mjs').Language} */
export default {
  id: 'r',
  name: 'R',
  dir,
  extension: '.R',
  comment: '#',

  /** prelude.R, run by eval(parse(…)) on ONE line, so the koan's line numbers shift by exactly one. */
  prelude() {
    return `eval(parse(text = ${JSON.stringify(readFileSync(dir + 'prelude.R', 'utf8'))}))\n`;
  },
  epilogue: '\n',

  /** A blank belongs to an expectation: on a line that calls one. */
  lint(code) {
    return code.split('\n').flatMap((l, i) =>
      l.includes('___') && !/\bexpect_\w+\s*\(/.test(l) ? [`line ${i + 1} has a blank outside an expectation`] : [],
    );
  },

  /**
   * webR from its npm package (49 MB unpacked, with dependencies for its own demo app), so it
   * isn't installed. Paths under dist/ keep their folders: webR finds R's library by them.
   */
  runtime: {
    kind: 'npm-tarball',
    package: 'webr',
    strip: 'dist/',
    files: [
      'dist/webr.mjs', // for Node
      'dist/webr.js', // for the browser: the same, without Node's imports
      'dist/webr-worker.js',
      'dist/R.js',
      'dist/R.wasm',
      'dist/libRblas.so',
      'dist/libRlapack.so',
      'dist/vfs/etc/fonts/fonts.conf',
      'dist/vfs/etc/ssl/cert.pem',
      'dist/vfs/usr/lib/R/library/translations/DESCRIPTION',
      'dist/vfs/usr/lib/R/share.data.gz',
      'dist/vfs/usr/lib/R/share.js.metadata',
      // Fonts for R's graphics, which koans don't draw; webR loads them when R starts.
      ...['NotoSans', 'NotoSerif'].flatMap(family =>
        ['Regular', 'Bold', 'Italic', 'BoldItalic'].map(style => `dist/vfs/usr/share/fonts/${family}-${style}.ttf`),
      ),
      'dist/vfs/usr/share/fonts/NotoSansMono-Regular.ttf',
      'dist/vfs/usr/share/fonts/NotoSansMono-Bold.ttf',
      'dist/vfs/var/cache/fontconfig/3830d5c3ddfd5cd38a049b759396e72e-le32d8.cache-9',
      'dist/vfs/var/cache/fontconfig/CACHEDIR.TAG',
      'LICENSE.md',
    ],
    out: webrDir,
  },

  async load() {
    let makeRunner, WebR, ChannelType;
    try {
      ({ makeRunner } = await import(pathToFileURL(runtimeDir + 'worker.js').href));
      ({ WebR, ChannelType } = await import(pathToFileURL(webrDir + 'webr.mjs').href));
      readFileSync(webrDir + 'R.wasm');
    } catch (e) {
      throw new Error(`R runtime missing — run \`npm run fetch-runtime\` first. (${e.message})`);
    }
    // Under Node, webR runs R in a worker_threads Worker (it makes that the global Worker), which
    // would keep the tools from ever exiting. Its threads are held only while R starts or runs.
    const threads = new Set();
    const { Worker } = await import('node:worker_threads');
    globalThis.Worker = class extends Worker {
      constructor(...args) {
        super(...args);
        threads.add(this);
      }
    };
    const holding = async work => {
      for (const t of threads) t.ref();
      try {
        return await work();
      } finally {
        for (const t of threads) t.unref();
      }
    };
    const { run, version } = await holding(() => makeRunner(WebR, ChannelType, webrDir));
    return { version: `${version} (webR)`, run: src => holding(() => run(src)) };
  },
};
