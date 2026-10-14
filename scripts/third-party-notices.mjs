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

## Fonts

Fraunces, Inter and JetBrains Mono are loaded from Google Fonts at run time and are not
distributed with the site. All three are under the SIL Open Font License 1.1.

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
