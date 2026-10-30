// Writes THIRD-PARTY-NOTICES.md: the licenses of everything the built site ships.
// Run after changing dependencies: npm run notices
//
// The file opens with a summary table; each component then gets a short section (what it is,
// where it comes from, its license), with full license texts folded away in <details> blocks.
// A license text shared by several components is printed once, under "License texts". The build
// copies the file to the site as third-party-notices.txt, without the <details> tags.
import { execSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const license = name => readFileSync(new URL(`./licenses/${name}`, import.meta.url), 'utf8').trim();
const fromModules = path => readFileSync(new URL(`../node_modules/${path}`, import.meta.url), 'utf8').trim();

/** A code block for a text, with a fence longer than any run of backticks inside it. */
function block(text) {
  const longest = Math.max(2, ...[...text.matchAll(/`+/g)].map(m => m[0].length));
  const fence = '`'.repeat(longest + 1);
  return `${fence}\n${text}\n${fence}`;
}

/** A full text, folded away: GitHub shows the summary line, and the text on a click. */
const folded = (summary, text) => `<details>\n<summary>${summary}</summary>\n\n${block(text)}\n\n</details>`;

/** GitHub's anchor for a heading. */
const anchor = heading => heading.toLowerCase().replace(/[^\p{L}\p{N} _-]/gu, '').replace(/ /g, '-');

// Texts several components share, printed once at the end.
const SHARED = {
  'Apache License 2.0': license('Apache-2.0.txt'),
};
const seeShared = name => `The full text is under [${name}](#${anchor(name)}), below.`;

/**
 * The components the site ships, besides the npm packages listed at the end: what each is for (the
 * summary table), its license in a few words, and its section.
 */
const components = [
  {
    name: 'Raku.js',
    usedFor: 'Raku interpreter',
    license: 'Artistic License 2.0',
    body: `\`public/runtime/raku/rakujs.js\` and \`rakujs.wasm\`, downloaded by \`npm run fetch-runtime\` from the
Raku++ releases at https://github.com/ash/rakupp/releases. Under the Artistic License 2.0, the same
license as koans.app's code: see \`LICENSE\`.`,
  },
  {
    name: 'Ace',
    usedFor: 'Raku syntax highlighting',
    license: 'BSD 3-Clause',
    body: `The editor's Raku highlighting (\`languages/raku/highlight.ts\`, \`languages/raku/words.ts\`) is adapted
from Ace's Raku mode (ace-builds 1.44.0, \`src/mode/raku_highlight_rules.js\`),
https://github.com/ajaxorg/ace.`,
    texts: [['BSD 3-Clause License', license('Ace-BSD-3-Clause.txt')]],
  },
  {
    name: 'OCaml toplevel',
    usedFor: 'OCaml interpreter',
    license: 'ISC, BSD 3-Clause, LGPL 2.1 with linking exception',
    body: `\`public/runtime/ocaml/worker.min.js\` (the OCaml 5.0 compiler and toplevel, compiled to JavaScript)
and \`public/runtime/ocaml/stdlib/*.cmi\` (the compiled interfaces of OCaml's standard library),
downloaded by \`npm run fetch-runtime\` from the \`playground/asset\` folder of
https://github.com/ocaml/ocaml.org, at the commit pinned in \`languages/ocaml/runtime.lock.json\`, and
served unmodified.

- The playground's code (https://github.com/ocaml/ocaml.org/tree/main/playground) is under the ISC
  License. It is built from js_top_worker (https://github.com/tmattio/js_top_worker), under the same
  license, which contains code from utop (https://github.com/ocaml-community/utop), under the BSD
  3-Clause License.
- It contains the OCaml compiler, toplevel and standard library, version 5.0.0
  (https://github.com/ocaml/ocaml/tree/5.0.0), and the js_of_ocaml compiler's runtime and toplevel
  libraries, version 5.4.0 (https://github.com/ocsigen/js_of_ocaml/tree/5.4.0), both under the GNU
  Lesser General Public License 2.1 with a static linking exception; their source code is at those
  addresses.`,
    texts: [
      ['ISC License (the playground and js_top_worker)', license('OCaml.org-ISC.txt')],
      ['BSD 3-Clause License (utop)', license('utop-LICENSE.txt')],
      ["OCaml's license (LGPL 2.1 with linking exception)", license('OCaml-LICENSE.txt')],
      ["js_of_ocaml's license (LGPL 2.1 with linking exception)", license('js_of_ocaml-LICENSE.txt')],
    ],
  },
  {
    name: 'SWI-Prolog',
    usedFor: 'Prolog interpreter',
    license: 'BSD 2-Clause, MIT (LibBF), zlib',
    body: `\`public/runtime/prolog/swipl-web.js\`, \`swipl-web.wasm\` and \`swipl-web.data\` (SWI-Prolog compiled to
WebAssembly, with its libraries), downloaded by \`npm run fetch-runtime\` from the \`swipl-wasm\` npm
package (the version pinned in \`languages/prolog/runtime.lock.json\`),
https://github.com/SWI-Prolog/npm-swipl-wasm. SWI-Prolog's source is at
https://github.com/SWI-Prolog/swipl-devel. It contains LibBF, for its unbounded integers, under the
MIT License, and zlib, under the zlib License (its text is in ruby.wasm's notices).`,
    texts: [
      ["SWI-Prolog's license", license('SWI-Prolog-LICENSE.txt')],
      ['MIT License (LibBF)', license('LibBF-MIT.txt')],
    ],
  },
  {
    name: 'Go',
    usedFor: 'Go compiler, linker and standard library',
    license: 'BSD 3-Clause',
    body: `\`public/runtime/go/compile.*.wasm\` (Go's \`cmd/compile\`, in parts), \`link.wasm\` (\`cmd/link\`) and
\`pkg/**/*.a\` (Go's standard library, compiled), built for WebAssembly by \`npm run fetch-runtime\` from
the official Go release pinned in \`languages/go/runtime.lock.json\` (https://go.dev/dl/). Go's source
is at https://go.dev/s/go-source (https://github.com/golang/go).

The koans' \`assert\` and \`require\` (\`public/runtime/go/support/\`) are written for koans.app, after the
API of testify (https://github.com/stretchr/testify); they contain none of its code.`,
    texts: [['BSD 3-Clause License', license('Go-LICENSE.txt')]],
  },
  {
    name: 'Pyodide and CPython',
    usedFor: 'Python interpreter',
    license: 'MPL 2.0 (Pyodide), PSF License (CPython)',
    body: `\`public/runtime/python/\` (\`pyodide.mjs\`, \`pyodide.asm.mjs\`, \`pyodide.asm.wasm\`, \`python_stdlib.zip\`,
\`pyodide-lock.json\`), copied by \`npm run fetch-runtime\` from the \`pyodide\` npm package (the version
pinned in \`languages/python/runtime.lock.json\`). Pyodide's source code is at
https://github.com/pyodide/pyodide, tagged with that version. It contains CPython, the Python
interpreter and its standard library (https://github.com/python/cpython).`,
    texts: [
      ['Mozilla Public License 2.0 (Pyodide)', license('Pyodide-MPL-2.0.txt')],
      ['Python Software Foundation License (CPython)', license('Python-PSF.txt')],
    ],
  },
  {
    name: 'Acorn',
    usedFor: "Finding a JavaScript syntax error's line",
    license: 'MIT',
    body: `\`public/runtime/javascript/acorn.mjs\`, copied by \`npm run fetch-runtime\` from the \`acorn\` npm package
(the version pinned in \`languages/javascript/runtime.lock.json\`), https://github.com/acornjs/acorn.`,
    texts: [['MIT License', fromModules('acorn/LICENSE')]],
  },
  {
    name: 'TypeScript',
    usedFor: 'TypeScript compiler',
    license: 'Apache License 2.0',
    body: `The compiler the TypeScript koans are checked and compiled with, and the library files they're
checked against: \`public/runtime/typescript/typescript.js\` and \`lib.*.d.ts\`, copied by
\`npm run fetch-runtime\` from the \`typescript\` npm package (the version pinned in
\`languages/typescript/runtime.lock.json\`), https://github.com/microsoft/TypeScript. Under the Apache
License 2.0. ${seeShared('Apache License 2.0')}`,
    texts: [['Notices for third-party material in the library files', fromModules('typescript/ThirdPartyNoticeText.txt')]],
  },
  {
    name: 'ruby.wasm',
    usedFor: 'Ruby interpreter',
    license: 'MIT (ruby.wasm), Ruby License and others (Ruby and its libraries)',
    body: `\`public/runtime/ruby/ruby.wasm\` (CRuby compiled to WebAssembly) and \`browser.umd.js\`, downloaded by
\`npm run fetch-runtime\` from the \`@ruby/4.0-wasm-wasi\` npm package (the version pinned in
\`languages/ruby/runtime.lock.json\`), https://github.com/ruby/ruby.wasm. Its notices cover Ruby itself
and the libraries built into it: LibYAML, zlib, wasi-libc, OpenSSL and wasi-vfs.`,
    texts: [
      ['MIT License (ruby.wasm)', license('ruby.wasm-LICENSE.txt')],
      ["Notices for Ruby and the libraries built into it", license('ruby.wasm-NOTICE.txt')],
    ],
  },
  {
    name: 'php-wasm',
    usedFor: 'PHP interpreter',
    license: 'Apache License 2.0 (php-wasm), PHP License 3.01 (PHP)',
    body: `\`public/runtime/php/\` (PHP 8.5 compiled to WebAssembly, its JavaScript loader and php-wasm's runtime
wrapper), downloaded by \`npm run fetch-runtime\` from the \`php-wasm\` npm package (the version pinned in
\`languages/php/runtime.lock.json\`), https://github.com/seanmorris/php-wasm. php-wasm is dual licensed
under the Apache License 2.0, which this project uses, and the GNU GPL version 2.
${seeShared('Apache License 2.0')}

PHP itself, https://www.php.net, is under the PHP License, version 3.01; the libraries built into it
(PCRE2, timelib, lexbor and others) are under their own licenses, listed in PHP's source.`,
    texts: [
      ["php-wasm's notice", license('php-wasm-NOTICE.txt')],
      ['PHP License 3.01', license('PHP-LICENSE.txt')],
    ],
  },
  {
    name: 'webR',
    usedFor: 'R interpreter',
    license: 'GNU GPL 3 (the binaries), MIT (webR\'s own code)',
    body: `\`public/runtime/r/webr/\` (R compiled to WebAssembly, with BLAS, LAPACK and webR's JavaScript),
downloaded by \`npm run fetch-runtime\` from the \`webr\` npm package (the version pinned in
\`languages/r/runtime.lock.json\`), https://github.com/r-wasm/webr. R is free software under the GNU
GPL; webR's binaries are distributed under the GNU GPL version 3, and are served here unmodified, as
webR publishes them. Their source: https://github.com/r-wasm/webr and https://www.r-project.org.`,
    texts: [["webR's licensing, with the full license texts", license('webR-LICENSE.md')]],
  },
  {
    name: 'wasmoon',
    usedFor: 'Lua interpreter',
    license: 'MIT (wasmoon and Lua)',
    body: `\`public/runtime/lua/index.js\` and \`glue.wasm\` (Lua 5.4 compiled to WebAssembly), downloaded by
\`npm run fetch-runtime\` from the \`wasmoon\` npm package (the version pinned in
\`languages/lua/runtime.lock.json\`), https://github.com/ceifa/wasmoon. Its license comes from its
repository: the npm package has no copy. It contains Lua, https://www.lua.org.`,
    texts: [
      ['MIT License (wasmoon)', license('wasmoon-LICENSE.txt')],
      ['MIT License (Lua)', license('Lua-MIT.txt')],
    ],
  },
  {
    name: 'Scittle',
    usedFor: 'Clojure interpreter',
    license: 'Eclipse Public License 1.0, Apache License 2.0 (Closure Library)',
    body: `\`public/runtime/clojure/scittle.js\` (SCI, the Small Clojure Interpreter, compiled to JavaScript),
downloaded by \`npm run fetch-runtime\` from the \`scittle\` npm package (the version pinned in
\`languages/clojure/runtime.lock.json\`), https://github.com/babashka/scittle. Copyright © 2021 - 2022
Michiel Borkent, under the Eclipse Public License 1.0, and served unmodified; its source is at that
address.

It is built from SCI (https://github.com/babashka/sci) and ClojureScript
(https://github.com/clojure/clojurescript), both under the Eclipse Public License 1.0, and the Google
Closure Library (https://github.com/google/closure-library), under the Apache License 2.0.
${seeShared('Apache License 2.0')}`,
    texts: [['Eclipse Public License 1.0', license('Scittle-EPL-1.0.txt')]],
  },
  {
    name: 'Stak',
    usedFor: 'Scheme interpreter',
    license: 'MIT',
    body: `\`public/runtime/scheme/stak_wasm.js\` and \`stak_wasm_bg.wasm\` (Stak Scheme compiled to WebAssembly),
downloaded by \`npm run fetch-runtime\` from the \`@raviqqe/stak\` npm package (the version pinned in
\`languages/scheme/runtime.lock.json\`), https://github.com/raviqqe/stak. Its license comes from its
repository: the npm package has no copy.`,
    texts: [['MIT License', license('Stak-LICENSE.txt')]],
  },
  {
    name: 'sql.js',
    usedFor: 'SQLite database',
    license: 'MIT (sql.js), public domain (SQLite)',
    body: `\`public/runtime/sql/sql-wasm.js\` and \`sql-wasm.wasm\` (SQLite compiled to WebAssembly), downloaded by
\`npm run fetch-runtime\` from the \`sql.js\` npm package (the version pinned in
\`languages/sql/runtime.lock.json\`), https://github.com/sql-js/sql.js. It contains SQLite,
https://sqlite.org, which is in the public domain.`,
    texts: [["sql.js's license", license('sql.js-LICENSE.txt')]],
  },
];

// npm packages: the runtime dependencies (and theirs), plus Svelte, whose runtime is compiled into
// the bundle. The fonts get a section of their own.
const dirs = execSync('npm ls --omit=dev --all --parseable', { encoding: 'utf8' }).trim().split('\n').slice(1);
dirs.push(join(process.cwd(), 'node_modules/svelte'));

/**
 * Splits a license file into its copyright lines and the license itself, so packages under the
 * same license, with different copyright holders, share one text.
 */
function splitCopyright(text) {
  const lines = text.split('\n');
  const copyright = [];
  const rest = [];
  // Copyright lines come first, sometimes after a title ("MIT License"): look only there.
  lines.forEach((line, i) => {
    if (i < 6 && /^\s*(copyright\b|\(c\)|©)/i.test(line)) copyright.push(line.trim());
    else rest.push(line);
  });
  const body = rest.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  return { copyright, body };
}

/** The license text compared without a leading title and whitespace, so copies of one license group together. */
const sameLicense = body => body.replace(/^(the )?mit license( \(mit\))?\s*/i, '').replace(/\s+/g, ' ');

const fonts = [];
const groups = new Map(); // license body -> { license, packages: [{ name, copyright }] }
for (const dir of [...new Set(dirs)].sort()) {
  const pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'));
  const file = readdirSync(dir).find(f => /^licen[cs]e/i.test(f));
  const text = file ? readFileSync(join(dir, file), 'utf8').trim() : `(${pkg.license}; no license file in the package)`;
  const { copyright, body } = splitCopyright(text);
  const entry = { name: `${pkg.name} ${pkg.version}`, copyright };
  if (pkg.name.startsWith('@fontsource')) {
    fonts.push({ ...entry, body });
    continue;
  }
  const key = sameLicense(body);
  if (!groups.has(key)) groups.set(key, { license: pkg.license, body, packages: [] });
  groups.get(key).packages.push(entry);
}
const fontLicense = [...new Set(fonts.map(f => f.body))];
if (fontLicense.length !== 1) throw new Error('the fonts no longer share one license text: list them separately');

// Each package, with its copyright lines.
const packageList = packages =>
  packages.map(p => `- ${p.name}${p.copyright.length ? `: ${p.copyright.join(' ').replace(/\s+/g, ' ')}` : ''}`).join('\n');

// The license groups, named by their license and their best-known packages.
const groupName = g => {
  const scopes = [...new Set(g.packages.map(p => p.name.match(/^@[^/]+|^[^@\s]+/)[0]))];
  return `${g.license}: ${scopes.join(', ')}`;
};
const packageGroups = [...groups.values()].sort((a, b) => b.packages.length - a.packages.length);
const packageLicenses = [...new Set(packageGroups.map(g => g.license))].join(', ');

// --- The file

let out = `# Third-party notices

koans.app ships the third-party software below in the built site. Each section says what a
component is, where it comes from and its license; the full license texts are folded under each
one. A license text several components share is printed once, at the end.

## Summary

| Component | Used for | License |
|---|---|---|
${components.map(c => `| [${c.name}](#${anchor(c.name)}) | ${c.usedFor} | ${c.license} |`).join('\n')}
| [Fonts](#fonts) | Fraunces, Inter and JetBrains Mono | SIL Open Font License 1.1 |
| [JavaScript packages](#javascript-packages) | The editor and the app | ${packageLicenses} |
`;

for (const c of components) {
  out += `\n## ${c.name}\n\n${c.body}\n`;
  for (const [summary, text] of c.texts ?? []) out += `\n${folded(summary, text)}\n`;
}

out += `
## Fonts

Fraunces, Inter and JetBrains Mono are served with the site, from the \`@fontsource-variable\` npm
packages, under the SIL Open Font License 1.1.

${packageList(fonts)}

${folded('SIL Open Font License 1.1', fontLicense[0])}

## JavaScript packages

The app's runtime dependencies, and theirs, compiled into the site's code, grouped by license.
`;
for (const g of packageGroups) {
  // The Apache License is printed once, at the end; other licenses with their packages.
  const text = g.license === 'Apache-2.0' ? seeShared('Apache License 2.0') : folded(`${g.license} license text`, g.body);
  out += `\n### ${groupName(g)}\n\n${packageList(g.packages)}\n\n${text}\n`;
}

out += `\n## License texts\n\nThe full texts of licenses that several components above share.\n`;
for (const [name, text] of Object.entries(SHARED)) out += `\n### ${name}\n\n${folded(name, text)}\n`;

writeFileSync('THIRD-PARTY-NOTICES.md', out);
const total = packageGroups.reduce((n, g) => n + g.packages.length, 0) + fonts.length;
console.log(`✓ THIRD-PARTY-NOTICES.md: ${components.length} components, ${total} npm packages in ${packageGroups.length + 1} license groups`);
