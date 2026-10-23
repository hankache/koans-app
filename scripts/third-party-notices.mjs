// Writes THIRD-PARTY-NOTICES.md: the licenses of everything the built site ships.
// Run after changing dependencies: npm run notices
import { execSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Runtime dependencies (and theirs), plus Svelte, whose runtime is compiled into the bundle.
const dirs = execSync('npm ls --omit=dev --all --parseable', { encoding: 'utf8' })
  .trim().split('\n').slice(1);
dirs.push(join(process.cwd(), 'node_modules/svelte'));

const groups = new Map(); // license text -> packages
for (const dir of [...new Set(dirs)].sort()) {
  const pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'));
  const file = readdirSync(dir).find(f => /^licen[cs]e/i.test(f));
  const text = file ? readFileSync(join(dir, file), 'utf8').trim() : `(${pkg.license}; no license file in the package)`;
  if (!groups.has(text)) groups.set(text, []);
  groups.get(text).push(`${pkg.name} ${pkg.version} (${pkg.license})`);
}

let out = `# Third-party notices

koans.app ships the following third-party software in the built site. Their licenses are
reproduced below.

## Raku.js (Raku++)

The interpreter the Raku koans run on: \`public/runtime/raku/rakujs.js\` and \`rakujs.wasm\`, downloaded by
\`npm run fetch-runtime\` from the Raku++ releases at https://github.com/ash/rakupp/releases.
Licensed under the Artistic License 2.0, the same license as koans.app's code; see \`LICENSE\`.

## Ace (Raku syntax highlighting)

The editor's Raku highlighting (\`languages/raku/highlight.ts\`, \`languages/raku/words.ts\`) is adapted
from Ace's Raku mode (ace-builds 1.44.0, \`src/mode/raku_highlight_rules.js\`),
https://github.com/ajaxorg/ace, under the BSD 3-Clause License:

\`\`\`
${readFileSync(new URL('./licenses/Ace-BSD-3-Clause.txt', import.meta.url), 'utf8').trim()}
\`\`\`

## OCaml toplevel (ocaml.org's playground)

The interpreter the OCaml koans run on: \`public/runtime/ocaml/worker.min.js\` (the OCaml 5.0
compiler and toplevel, compiled to JavaScript) and \`public/runtime/ocaml/stdlib/*.cmi\` (the compiled
interfaces of OCaml's standard library), downloaded by \`npm run fetch-runtime\` from the
\`playground/asset\` folder of https://github.com/ocaml/ocaml.org, at the commit pinned in
\`languages/ocaml/runtime.lock.json\`. They are served unmodified.

The playground's code (https://github.com/ocaml/ocaml.org/tree/main/playground) is under the ISC
License:

\`\`\`
${readFileSync(new URL('./licenses/OCaml.org-ISC.txt', import.meta.url), 'utf8').trim()}
\`\`\`

It is built from js_top_worker (https://github.com/tmattio/js_top_worker), under the ISC License
above, which contains code from utop (https://github.com/ocaml-community/utop), under the BSD
3-Clause License:

\`\`\`
${readFileSync(new URL('./licenses/utop-LICENSE.txt', import.meta.url), 'utf8').trim()}
\`\`\`

It contains the OCaml compiler, toplevel and standard library, version 5.0.0
(https://github.com/ocaml/ocaml/tree/5.0.0), and the js_of_ocaml compiler's runtime and toplevel
libraries, version 5.4.0 (https://github.com/ocsigen/js_of_ocaml/tree/5.4.0), both under the GNU
Lesser General Public License 2.1 with a static linking exception; their source code is at those
addresses. OCaml's license:

\`\`\`
${readFileSync(new URL('./licenses/OCaml-LICENSE.txt', import.meta.url), 'utf8').trim()}
\`\`\`

js_of_ocaml's license:

\`\`\`
${readFileSync(new URL('./licenses/js_of_ocaml-LICENSE.txt', import.meta.url), 'utf8').trim()}
\`\`\`

## Pyodide and CPython

The interpreter the Python koans run on: \`public/runtime/python/\` (\`pyodide.mjs\`,
\`pyodide.asm.mjs\`, \`pyodide.asm.wasm\`, \`python_stdlib.zip\`, \`pyodide-lock.json\`), copied by
\`npm run fetch-runtime\` from the \`pyodide\` npm package (the version pinned in
\`languages/python/runtime.lock.json\`).

Pyodide is licensed under the Mozilla Public License 2.0. Its source code is at
https://github.com/pyodide/pyodide, tagged with the version above.

\`\`\`
${readFileSync(new URL('./licenses/Pyodide-MPL-2.0.txt', import.meta.url), 'utf8').trim()}
\`\`\`

It contains CPython, the Python interpreter and its standard library, under the Python Software
Foundation License (https://github.com/python/cpython):

\`\`\`
${readFileSync(new URL('./licenses/Python-PSF.txt', import.meta.url), 'utf8').trim()}
\`\`\`

## Acorn

The JavaScript parser the JavaScript koans use to find a syntax error's line:
\`public/runtime/javascript/acorn.mjs\`, copied by \`npm run fetch-runtime\` from the \`acorn\` npm
package (the version pinned in \`languages/javascript/runtime.lock.json\`), https://github.com/acornjs/acorn.

\`\`\`
${readFileSync(new URL('../node_modules/acorn/LICENSE', import.meta.url), 'utf8').trim()}
\`\`\`

## TypeScript

The compiler the TypeScript koans are checked and compiled with, and the library files they're
checked against: \`public/runtime/typescript/typescript.js\` and \`lib.*.d.ts\`, copied by
\`npm run fetch-runtime\` from the \`typescript\` npm package (the version pinned in
\`languages/typescript/runtime.lock.json\`), https://github.com/microsoft/TypeScript. Licensed
under the Apache License 2.0:

\`\`\`
${readFileSync(new URL('../node_modules/typescript/LICENSE.txt', import.meta.url), 'utf8').trim()}
\`\`\`

Its notices for third-party material in the library files:

\`\`\`
${readFileSync(new URL('../node_modules/typescript/ThirdPartyNoticeText.txt', import.meta.url), 'utf8').trim()}
\`\`\`

## ruby.wasm (Ruby)

The interpreter the Ruby koans run on: \`public/runtime/ruby/ruby.wasm\` (CRuby compiled to
WebAssembly) and \`browser.umd.js\`, downloaded by \`npm run fetch-runtime\` from the
\`@ruby/4.0-wasm-wasi\` npm package (the version pinned in \`languages/ruby/runtime.lock.json\`),
https://github.com/ruby/ruby.wasm. Its license:

\`\`\`
${readFileSync(new URL('./licenses/ruby.wasm-LICENSE.txt', import.meta.url), 'utf8').trim()}
\`\`\`

And its notices, for Ruby itself and the libraries built into it:

\`\`\`
${readFileSync(new URL('./licenses/ruby.wasm-NOTICE.txt', import.meta.url), 'utf8').trim()}
\`\`\`

## php-wasm (PHP)

The interpreter the PHP koans run on: \`public/runtime/php/\` (PHP 8.5 compiled to WebAssembly,
its JavaScript loader and php-wasm's runtime wrapper), downloaded by \`npm run fetch-runtime\` from
the \`php-wasm\` npm package (the version pinned in \`languages/php/runtime.lock.json\`),
https://github.com/seanmorris/php-wasm. php-wasm is dual licensed under the Apache License 2.0
(see "Apache License 2.0" below), which this project uses, and the GNU GPL version 2. Its notice:

\`\`\`
${readFileSync(new URL('./licenses/php-wasm-NOTICE.txt', import.meta.url), 'utf8').trim()}
\`\`\`

PHP itself, https://www.php.net, is under the PHP License, version 3.01; the libraries built into
it (PCRE2, timelib, lexbor and others) are under their own licenses, listed in PHP's source.

\`\`\`
${readFileSync(new URL('./licenses/PHP-LICENSE.txt', import.meta.url), 'utf8').trim()}
\`\`\`

## webR (R)

The interpreter the R koans run on: \`public/runtime/r/webr/\` (R compiled to WebAssembly, with
BLAS, LAPACK and webR's JavaScript), downloaded by \`npm run fetch-runtime\` from the \`webr\` npm
package (the version pinned in \`languages/r/runtime.lock.json\`), https://github.com/r-wasm/webr.
R is free software under the GNU GPL; webR's binaries are distributed under the GNU GPL version 3,
and are served here unmodified, as webR publishes them. Their source: https://github.com/r-wasm/webr
and https://www.r-project.org. webR's licensing, with the full license texts:

\`\`\`
${readFileSync(new URL('./licenses/webR-LICENSE.md', import.meta.url), 'utf8').trim()}
\`\`\`

## wasmoon (Lua)

The interpreter the Lua koans run on: \`public/runtime/lua/index.js\` and \`glue.wasm\` (Lua 5.4
compiled to WebAssembly), downloaded by \`npm run fetch-runtime\` from the \`wasmoon\` npm package
(the version pinned in \`languages/lua/runtime.lock.json\`), https://github.com/ceifa/wasmoon.
Its license (from its repository; the npm package has no copy):

\`\`\`
${readFileSync(new URL('./licenses/wasmoon-LICENSE.txt', import.meta.url), 'utf8').trim()}
\`\`\`

It contains Lua, https://www.lua.org, under the MIT License:

\`\`\`
${readFileSync(new URL('./licenses/Lua-MIT.txt', import.meta.url), 'utf8').trim()}
\`\`\`

## Scittle (Clojure)

The interpreter the Clojure koans run on: \`public/runtime/clojure/scittle.js\` (SCI, the Small
Clojure Interpreter, compiled to JavaScript), downloaded by \`npm run fetch-runtime\` from the
\`scittle\` npm package (the version pinned in \`languages/clojure/runtime.lock.json\`),
https://github.com/babashka/scittle. Copyright © 2021 - 2022 Michiel Borkent, distributed under the
Eclipse Public License 1.0. It is served unmodified; its source is at the address above.

It is built from SCI (https://github.com/babashka/sci) and ClojureScript
(https://github.com/clojure/clojurescript), both under the Eclipse Public License 1.0, and the
Google Closure Library (https://github.com/google/closure-library), under the Apache License 2.0
(see "Apache License 2.0" below). The Eclipse Public License 1.0:

\`\`\`
${readFileSync(new URL('./licenses/Scittle-EPL-1.0.txt', import.meta.url), 'utf8').trim()}
\`\`\`

## Stak (Scheme)

The interpreter the Scheme koans run on: \`public/runtime/scheme/stak_wasm.js\` and
\`stak_wasm_bg.wasm\` (Stak Scheme compiled to WebAssembly), downloaded by \`npm run fetch-runtime\`
from the \`@raviqqe/stak\` npm package (the version pinned in \`languages/scheme/runtime.lock.json\`),
https://github.com/raviqqe/stak. Its license (from its repository; the npm package has no copy):

\`\`\`
${readFileSync(new URL('./licenses/Stak-LICENSE.txt', import.meta.url), 'utf8').trim()}
\`\`\`

## sql.js (SQLite)

The database the SQL koans run on: \`public/runtime/sql/sql-wasm.js\` and \`sql-wasm.wasm\` (SQLite
compiled to WebAssembly), downloaded by \`npm run fetch-runtime\` from the \`sql.js\` npm package (the
version pinned in \`languages/sql/runtime.lock.json\`), https://github.com/sql-js/sql.js. Its license:

\`\`\`
${readFileSync(new URL('./licenses/sql.js-LICENSE.txt', import.meta.url), 'utf8').trim()}
\`\`\`

It contains SQLite, https://sqlite.org, which is in the public domain.

## Fonts

Fraunces, Inter and JetBrains Mono are served with the site, from the @fontsource-variable
packages listed below with their license, the SIL Open Font License 1.1.

## JavaScript packages
`;
for (const [text, pkgs] of groups) {
  out += `\n### ${pkgs.map(p => p.split(' (')[0]).join(', ')}\n\n${pkgs.map(p => `- ${p}`).join('\n')}\n\n\`\`\`\n${text}\n\`\`\`\n`;
}
// Apache-2.0 asks that recipients get the full license, not just the per-package notice.
if ([...groups.values()].flat().some(p => p.includes('(Apache-2.0)'))) {
  const apache = readFileSync(new URL('./licenses/Apache-2.0.txt', import.meta.url), 'utf8').trim();
  out += `\n## Apache License 2.0\n\nThe full text, for the Apache-2.0 packages above.\n\n\`\`\`\n${apache}\n\`\`\`\n`;
}
writeFileSync('THIRD-PARTY-NOTICES.md', out);
console.log(`✓ THIRD-PARTY-NOTICES.md: ${dirs.length} packages, ${groups.size} distinct license texts`);
