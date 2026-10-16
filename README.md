<p align="center">
  <img src="public/favicon.svg" alt="The gateless gate: a torii framing a question mark" width="120">
</p>

<h1 align="center">koans.app</h1>

<p align="center">
  Learn a programming language by fixing failing tests, right in your browser.
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/code-Artistic--2.0-blue" alt="Code licence: Artistic License 2.0"></a>
  <a href="LICENSE-CONTENT"><img src="https://img.shields.io/badge/koans-CC%20BY--SA%204.0-lightgrey" alt="Koans licence: CC BY-SA 4.0"></a>
  <a href="LICENSE-ARTWORK"><img src="https://img.shields.io/badge/artwork-CC%20BY--SA%204.0-lightgrey" alt="Artwork licence: CC BY-SA 4.0"></a>
</p>

Each koan is a small program whose tests fail. Replace every `___` until they pass, and the
language tells you whether you've got it right or shows you what it expected.

It's test-driven from the start. The koans are written with each language's own testing tools,
so you learn the language and how to test it at the same time.

Everything runs in your browser, on each language's interpreter compiled to WebAssembly. There's
nothing to install and no need for accounts and log-ins. Progress is saved locally in the browser.

The idea comes from [Ruby Koans](https://www.rubykoans.com/).

> **Work in progress.** koans.app grows out of [Raku Koans](https://hankache.github.io/raku-koans/),
> and isn't published yet. [PLAN.md](PLAN.md) has the plan.

## Languages

| Language                      | Koans | Interpreter                                         | Tests written with |
|-------------------------------|-------|-----------------------------------------------------|--------------------|
| [JavaScript](languages/javascript/) | 89 | the browser's own engine                      | Vitest's `expect` |
| [Lua](languages/lua/)         | 63    | [wasmoon](https://github.com/ceifa/wasmoon) (Lua 5.4) | busted's assertions |
| [PHP](languages/php/)         | 68    | [php-wasm](https://github.com/seanmorris/php-wasm) (PHP 8.5) | PHPUnit's assertions |
| [Python](languages/python/)   | 86    | [Pyodide](https://pyodide.org) (CPython 3.14)       | pytest's plain `assert`s |
| [R](languages/r/)             | 63    | [webR](https://docs.r-wasm.org/webr/latest/) (R 4.6) | testthat's expectations |
| [Raku](languages/raku/)       | 105   | [Raku++](https://github.com/ash/rakupp) (Raku.js)   | Raku's `Test`      |
| [Ruby](languages/ruby/)       | 77    | [ruby.wasm](https://github.com/ruby/ruby.wasm) (CRuby 4.0) | RSpec's `expect` |
| [SQL](languages/sql/)         | 64    | [sql.js](https://github.com/sql-js/sql.js) (SQLite 3.49) | expected rows in `-- expect:` comments |
| [TypeScript](languages/typescript/) | 65 | the TypeScript 6 compiler, then the browser's engine | Vitest's `expect` and `expectTypeOf` |

## Running it locally

You need [Node.js](https://nodejs.org) 22 or newer.

```sh
npm install
npm run fetch-runtime   # downloads each language's interpreter (see "Interpreters" below)
npm run dev             # http://localhost:5173
```

| Command                   | What it does                                                            |
|---------------------------|-------------------------------------------------------------------------|
| `npm run dev`             | Development server that reloads the page when code changes              |
| `npm run build`           | Builds the site into `dist/`                                            |
| `npm run preview`         | Serves the built site at http://localhost:4173                          |
| `npm run check:koans`     | Runs every koan and its solution on its interpreter (see below)         |
| `npm test`                | Tests how the app reads results, reveals answers and saves progress     |
| `npm run test:browser`    | Builds the site and checks it in Chrome and Firefox (see below)         |
| `npm run check`           | Type-checks the app                                                     |
| `npm run fetch-runtime`   | Downloads the pinned interpreters into `public/runtime/<language>/`     |
| `npm run notices`         | Regenerates `THIRD-PARTY-NOTICES.md` after dependencies change          |

`build:koans`, `check:koans` and `fetch-runtime` work on every language, or only those you name:
`npm run check:koans -- --lang raku`.

The koan list is compiled when the dev server starts, so restart it after adding or editing koans.

## Project layout

```
languages/        one folder per language: its koans, prelude, highlighting and interpreter setup
  index.ts          the languages the app offers
  javascript/       see languages/javascript/README.md
  lua/              see languages/lua/README.md
  php/              see languages/php/README.md
  python/           see languages/python/README.md
  r/                see languages/r/README.md
  raku/             see languages/raku/README.md
  ruby/             see languages/ruby/README.md
  sql/              see languages/sql/README.md
  typescript/       see languages/typescript/README.md
  _template/        a starting point for a new language
src/              the app (Svelte 5 + TypeScript)
  components/       the home page, the path, the koan page, the editor, the result panel, the logo animation
  lib/              addresses, opened languages (course.ts), running koans, reading their results,
                    progress and its export, the language-pack interface
public/           static files: favicons, artwork, each language's interpreter worker
  runtime/<id>/     a language's worker.js, with its interpreter beside it (downloaded)
scripts/          build and check tools: koan lists, koan checker, interpreter download, notices
  lib/languages.mjs the languages the tools know about
tests/            tests for the app's own logic, run on real interpreter output
design/           the logos' source image and the scripts that build the site's images from it
```

## How it works

```
languages/<id>/koans/ ──build-koans──► src/generated/<id>.json ──► the app
                                                                    │  prelude + your code + epilogue
                                                                    ▼
                                     public/runtime/<id>/worker.js (a Web Worker running the interpreter)
                                                                    │  test output (TAP)
                                                                    ▼
                                     src/lib/tap.ts ──► "Meditate on line 3", or "Enlightenment!"
```

- **Blanks.** Each language's prelude makes `___` a unique value and wraps its test library's
  assertions, so any assertion given a `___` fails, whichever it is.
- **Results.** Every language's tests print [TAP](https://testanything.org): `ok N - …`,
  `not ok N - …`, `# expected: …`, `# got: …`, and `# at web line N` for the learner's line.
  [tap.ts](src/lib/tap.ts) reads it: which assertions passed, the first failure and its line,
  "your answer" against what the language computed, subtests, `todo` and `skip`. Errors outside the
  tests are read with the language's own patterns.
- **Runaway code.** An interpreter runs a program to completion without pausing, so it runs in a
  Web Worker. After 8 seconds the worker is stopped and replaced
  ([wasm-runtime.ts](src/lib/runtime/wasm-runtime.ts)).
- **Highlighting.** The editor is [CodeMirror 6](https://codemirror.net), with each language's mode.
- **Addresses** ([route.ts](src/lib/route.ts)): `#/` picks a language, `#/<language>/` is its
  path and `#/<language>/koan/<section>/<name>` a koan. Raku Koans' `#/koan/…` addresses lead to
  the same Raku koan.
- **The home page** offers a one-blank koan to try by tapping an answer (from the packs' `teaser`),
  a "continue" card pointing at the unsolved koan worked on last, a tile per language, and, out of
  the way, export and import. It's laid out for a phone first.
- **Loading.** The home page loads no language. Opening one loads its koans and editor mode (a
  separate file of the build, `languages/<id>/content.ts`) and starts its interpreter downloading
  ([course.ts](src/lib/course.ts)). The home page counts progress from
  `src/generated/summary.json`, which lists every language's koan ids.
- **Progress** ([progress.svelte.ts](src/lib/progress.svelte.ts)) is stored per language in the
  browser's IndexedDB, one koan at a time, so tabs open side by side don't overwrite each other,
  and each tab shows the others' progress as it happens. It stays on one device, and clearing the
  site's data resets it. "Start over" on a language's path erases that language's progress.
- **Export and import** ([transfer.ts](src/lib/transfer.ts)): the home page saves everyone's
  progress to a JSON file (`"format": "koans.app/progress"`) and reads one back, keeping the newer
  entry for each koan. Damaged entries and unknown languages are left out.

## Writing koans

```
languages/raku/koans/
  05-lists-and-hashes/
    _section.json              { "title": "Lists and hashes", "blurb": "…" }
    03-hashes.raku              the koan, with ___ blanks
    03-hashes.solution.raku     the same code, filled in (only each blank's answer reaches the browser)
```

A koan starts with a title and an intro, in the language's comment style, followed by code using
its test library:

```raku
# title: Hashes
# intro: A hash, marked by the `%` sigil, maps keys to values.
my %capitals = UK => 'London', Germany => 'Berlin';
is %capitals<UK>, ___, 'look up a key';
```

In the intro, wrap code in backticks (`` `%capitals` ``) to show it in the code font. Use double
backticks for code that contains a backtick (``` ``#`( )`` ```).

To add a group, create a folder with a numeric prefix and a `_section.json` holding its title and
a one-line blurb.

### Rules for blanks

- The solution must **line up** with the koan: the same lines, with each `___` replaced by its
  answer and nothing else changed. The hidden answer in the result panel relies on this, and the
  checker rejects a koan that doesn't line up.
- Put **at most one `___` on a line**.
- Put each `___` **directly as an argument** of an assertion: the expected value, a type, a regex,
  a code block or a named argument. Inside an expression it isn't caught by the prelude, and the
  koan may die instead of failing.
- Keep the `___` on the line the interpreter reports for that assertion. The app shows
  "Meditate on line N" by looking for `___` on that line.

Each language's README adds its own rules, like [Raku's](languages/raku/README.md#rules-for-raku-blanks).
SQL, which has no assertions, has [rules of its own](languages/sql/README.md#rules-for-sql-blanks).

Numeric prefixes set the order but are dropped from ids (`lists-and-hashes/hashes`), so koans can
be reordered without losing anyone's progress. Renaming a koan, or moving it to another group,
does reset its progress.

**Then check everything:**

```sh
npm run check:koans
npm test
```

`check:koans` runs every koan and solution on the same interpreter as the browser (under Node).
Every line with a `___` must fail on its own while unfilled, every solution must pass, and the
language's own lint must pass. `npm test` then checks the koans the way the app reads them: the
hint for each failing line is its answer, and revealing every answer gives the solution.

## Adding a language

[languages/_template/](languages/_template/README.md) is a starting point, with step-by-step
instructions. In short, a language is a folder in `languages/` with two descriptions of it, one for
the build tools and one for the app, plus the files they point to:

| File                                  | What it is                                                                 |
|---------------------------------------|----------------------------------------------------------------------------|
| `languages/<id>/node.mjs`             | For the tools: koan extension and comment style, prelude, epilogue, lint, where the interpreter is released, how to run it under Node. The type is in [scripts/lib/languages.mjs](scripts/lib/languages.mjs) |
| `languages/<id>/pack.ts`              | For the app: name and wording, its look (accent colours and emblem), its path page's description and site link, a line of code for its tile and an optional koan to try, artwork, worker, highlighting, error formats. The type is in [src/lib/language.ts](src/lib/language.ts) |
| `languages/<id>/prelude.*`            | Run before every koan                                                      |
| `languages/<id>/runtime.lock.json`    | The pinned interpreter release, written by `fetch-runtime --update`        |
| `languages/<id>/koans/`               | The koans                                                                  |
| `languages/<id>/tap.test.ts`          | Tests of how the app reads that interpreter's real output                  |
| `languages/<id>/README.md`            | The path, the language's own rules for blanks, its limitations             |
| `public/runtime/<id>/worker.js`       | Runs the interpreter in a Web Worker, with the protocol in [wasm-runtime.ts](src/lib/runtime/wasm-runtime.ts) |

Then list it in [scripts/lib/languages.mjs](scripts/lib/languages.mjs) and
[languages/index.ts](languages/index.ts).

**What every language must do:**

1. `___` is a unique value, and any assertion given it fails, including pairs like `ok` and `nok`
   that want opposite truths.
2. Its tests print TAP, with `# expected:`/`# got:` diagnostics and `# at web line N` for the
   learner's line. For a language without a TAP library, the prelude brings a small one.
3. An error outside the tests names a line the pack's `errors.line` pattern can find.
4. A program can be stopped at any moment by terminating its worker.

## Browser tests

`npm run test:browser` builds the site, serves it, and drives the Chrome and Firefox installed on
the machine through every language's koan flow: a failing koan, its solution, an error, an
infinite loop. It also checks what each page downloads, old addresses, export and import, and two
tabs sharing progress. It takes a couple of minutes.

`-- --browser chrome` (or `firefox`) runs one browser. Set `CHROME_PATH` or `FIREFOX_PATH` if a
browser isn't where it's usually installed; one that isn't found is skipped with a warning. CI
runs these checks on every change, before publishing.

## Interpreters

Each language's interpreter comes from its official releases, and its
`languages/<id>/runtime.lock.json` pins the release and the checksums of its files.
`npm run fetch-runtime` gets each one and checks it against the lock, and stops if anything
differs. It comes from one of two kinds of source, set in the language's `node.mjs`:

- **A GitHub release zip** (Raku): downloaded and also checked against the checksum published
  with the release.
- **An npm package** (Python's Pyodide, JavaScript's Acorn parser, the TypeScript compiler): installed by `npm install`,
  which checks it against `package-lock.json`, then copied.
- **An npm package not worth installing** (Ruby's ruby.wasm, too big; Lua's wasmoon, with
  dependencies of its own; SQL's sql.js and PHP's php-wasm, with many builds; R's webR, with its demo app's): its tarball is downloaded from the npm registry and checked against the
  integrity hash the registry publishes.

The interpreter files aren't committed: the build fetches them.

To move a language to a newer release:

```sh
npm run fetch-runtime -- --lang raku --update     # the latest release, or: --update v5.1.0
npm run check:koans -- --lang raku                # every koan must still pass before you publish
npm test
```

For an npm package, install the new version first (`npm install --save-dev pyodide@<version>`);
`--update` then pins what's installed.

## Publishing

`npm run build` produces a static site in `dist/` that you can host anywhere.

A build for publishing should run:

```sh
npm ci
npm run fetch-runtime
npm run check:koans
npm test
npm run build
node tests/browser/run.mjs   # then publish dist/
```

- The site serves its own copy of each interpreter, so once published it doesn't depend on GitHub
  or anyone else. A changed interpreter can only affect a *new* build, and the lock stops that.
- The same build works at the root of a domain (`koans.app`) or in a sub-folder
  (`user.github.io/koans-app/`): its links are relative (`base: './'` in
  [vite.config.ts](vite.config.ts)).
- Make sure `.wasm` files are served as `application/wasm`. The main hosts do this already.

## Logos

- **The gateless gate** (header, favicon, this README): vector art in
  [GateMark.svelte](src/components/GateMark.svelte) and [public/favicon.svg](public/favicon.svg),
  which switches to a light gate on dark browser tabs. After changing the SVG, regenerate the PNG
  icons with `design/build-favicons.sh` (needs ImageMagick).
- **The Raku Koans logo** (the Raku home page and its solved-koan animation):
  [design/logo.jpg](design/logo.jpg) is the source. `python3 design/build-logo-assets.py` (needs
  numpy, scipy and Pillow) builds `public/logo.webp` and the animation layers in `public/anim/`.

## Known limitations

- Answers are checked in the browser, so a learner could "pass" a koan by deleting its
  assertions. That's fine for a learning tool.
- Each language's README lists what its interpreter can't do in a browser.

## License

- **Code**, including each language's prelude and the "gateless gate" mark:
  [Artistic License 2.0](LICENSE).
- **Koans** (the koans, their solutions, and the groups' titles and blurbs):
  [CC BY-SA 4.0](LICENSE-CONTENT).
- **Artwork** (the Raku Koans logo and its animation layers): [CC BY-SA 4.0](LICENSE-ARTWORK),
  which lists the files it covers.
- **Third-party software** shipped in the site: [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).

Contributions are accepted under these same licenses: see [CONTRIBUTING.md](CONTRIBUTING.md).

The name "koans.app" and the gateless gate mark identify this project. You're welcome to reuse
the code, koans and artwork under their licenses, but please don't present a copy or fork as koans.app.
