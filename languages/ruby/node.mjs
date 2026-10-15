// Ruby for the build tools: where its koans live, how they're wrapped and checked, and how to run
// them under Node with the browser worker's own code (public/runtime/ruby/worker.js), on the same
// ruby.wasm, so CI checks koans the way the browser runs them.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { runInThisContext } from 'node:vm';

const dir = fileURLToPath(new URL('./', import.meta.url));
const runtimeDir = fileURLToPath(new URL('../../public/runtime/ruby/', import.meta.url));
const rubyString = text => JSON.stringify(text).replace(/#/g, '\\u0023');

/** @type {import('../../scripts/lib/languages.mjs').Language} */
export default {
  id: 'ruby',
  name: 'Ruby',
  dir,
  extension: '.rb',
  comment: '#',

  /**
   * prelude.rb run by eval() on ONE line, so the koan's line numbers shift by exactly one. Ruby
   * can't be folded onto one line safely, but a string literal can hold all of it.
   */
  prelude() {
    return `eval(${rubyString(readFileSync(dir + 'prelude.rb', 'utf8'))}, binding, "prelude.rb", 1)\n`;
  },
  epilogue: '\n',

  /**
   * ruby.wasm is built without the standard library, so require finds nothing to load. A blank
   * belongs to an expectation: on a line with its .to, .not_to or .to_not.
   */
  lint(code) {
    return code.split('\n').flatMap((l, i) => [
      ...(/^\s*require\b/.test(l) ? [`line ${i + 1} requires a library; the browser's Ruby has none`] : []),
      ...(l.includes('___') && !/\.(to|not_to|to_not)\b/.test(l) ? [`line ${i + 1} has a blank outside an expectation`] : []),
    ]);
  },

  /** Ruby 4.0 from the ruby.wasm project's npm package (100 MB with all its builds: not installed). */
  runtime: {
    kind: 'npm-tarball',
    package: '@ruby/4.0-wasm-wasi',
    files: ['dist/ruby.wasm', 'dist/browser.umd.js'],
    out: runtimeDir,
  },

  async load() {
    let makeRunner, DefaultRubyVM, module;
    try {
      ({ makeRunner } = await import(runtimeDir + 'worker.js'));
      // browser.umd.js is a script that defines a global; evaluate it as one.
      runInThisContext(readFileSync(runtimeDir + 'browser.umd.js', 'utf8'), { filename: 'browser.umd.js' });
      ({ DefaultRubyVM } = globalThis['ruby-wasm-wasi']);
      module = await WebAssembly.compile(readFileSync(runtimeDir + 'ruby.wasm'));
    } catch (e) {
      throw new Error(`Ruby runtime missing — run \`npm run fetch-runtime\` first. (${e.message})`);
    }
    const run = makeRunner(DefaultRubyVM, module);
    const { lines } = await run('puts RUBY_DESCRIPTION.split.first(2).join(" ")');
    return { version: lines[0]?.text ?? 'ruby.wasm', run };
  },
};
