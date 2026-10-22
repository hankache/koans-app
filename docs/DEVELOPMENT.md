# Developing koans.app

How to run the site, how it's built, and how it's tested and published. For writing koans or
adding a language, see [CONTRIBUTING.md](../CONTRIBUTING.md); for what the site is, the
[README](../README.md).

## Running it locally

You need [Node.js](https://nodejs.org) 22.18 or newer (the build reads TypeScript with Node itself).

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
  components/       the home page, the path, the koan page, the editor, the result panel, the emblems
  lib/              addresses, opened languages (course.ts), running koans, reading their results,
                    progress and its export, the language-pack interface, offline mode (offline.ts)
  sw.js             the service worker, filled in by the build (vite.config.ts)
public/           static files: favicons, link-preview images, each language's interpreter worker
  runtime/<id>/     a language's worker.js, with its interpreter beside it (downloaded)
scripts/          build and check tools: koan lists, koan checker, interpreter download, notices
  lib/languages.mjs the languages the tools know about
  lib/pages.ts      the pages for search engines and shared links, added to the build
tests/            tests for the app's own logic, run on real interpreter output
design/           the scripts that make the site's icons and images, and the README's screenshots
docs/             DEVELOPMENT.md: this file
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
  [tap.ts](../src/lib/tap.ts) reads it: which assertions passed, the first failure and its line,
  "your answer" against what the language computed, subtests, `todo` and `skip`. Errors outside the
  tests are read with the language's own patterns.
- **Runaway code.** An interpreter runs a program to completion without pausing, so it runs in a
  Web Worker. After 8 seconds the worker is stopped and replaced
  ([wasm-runtime.ts](../src/lib/runtime/wasm-runtime.ts)).
- **Highlighting.** The editor is [CodeMirror 6](https://codemirror.net), with each language's mode.
- **Addresses** ([route.ts](../src/lib/route.ts)): `#/` picks a language, `#/<language>/` is its
  path and `#/<language>/koan/<section>/<name>` a koan. Raku Koans' `#/koan/…` addresses lead to
  the same Raku koan.
- **The home page** offers a one-blank koan to try by tapping an answer (from the packs' `teaser`),
  a "continue" card pointing at the unsolved koan worked on last, a tile per language, and, out of
  the way, export and import. It's laid out for a phone first.
- **Loading.** The home page loads no language. Opening one loads its koans and editor mode (a
  separate file of the build, `languages/<id>/content.ts`) and starts its interpreter downloading
  ([course.ts](../src/lib/course.ts)). The home page counts progress from
  `src/generated/summary.json`, which lists every language's koan ids.
- **Progress** ([progress.svelte.ts](../src/lib/progress.svelte.ts)) is stored per language in the
  browser's IndexedDB, one koan at a time, so tabs open side by side don't overwrite each other,
  and each tab shows the others' progress as it happens. It stays on one device, and clearing the
  site's data resets it. "Start over" on a language's path erases that language's progress.
- **Export and import** ([transfer.ts](../src/lib/transfer.ts)): the home page saves everyone's
  progress to a JSON file (`"format": "koans.app/progress"`) and reads one back, keeping the newer
  entry for each koan. Damaged entries and unknown languages are left out.
- **Offline** ([sw.js](../src/sw.js), [offline.ts](../src/lib/offline.ts)): in a built site, a service
  worker keeps the page, the code it starts with and its fonts, then each language's koans and interpreter
  the first time it's opened. A language opened once then works offline, and isn't downloaded
  again. The page itself comes from the network when it can (within 4 seconds), so a new version
  shows at once. The build names each interpreter's cache after a hash of its folder in
  `public/runtime/`, so an updated interpreter or worker replaces the old one; one the learner had
  opened is downloaded again in the background. On a first visit the interpreter waits for the
  service worker (up to 3 seconds), so that its files are saved too. The site can be installed as
  an app (`manifest.webmanifest`). The dev server doesn't use the service worker.
- **While an interpreter loads**, the koan page says so: "Downloading Python… 6.1 of 13.5 MB",
  then "Starting Python…". The service worker reports each file's progress as it streams in; the
  total is the interpreter's folder, less source maps, licences and what the language's `node.mjs`
  lists as `onDemand` (files the browser loads only when needed). Without a service worker (the
  dev server, or a first visit where it was slow to take over) it just says "Preparing Python…".
- **Sharing a koan** ([share.ts](../src/lib/share.ts)): Share puts the editor's code in a link,
  compressed, after the `#` (`#/python/koan/numbers/division?code=…`), so it never reaches the
  server and nothing is stored: whoever has the link has the code. On a phone it opens the
  phone's share sheet; elsewhere it copies the link. Opening one shows that code with a note to
  read it before running it; the learner's own code stays saved until they run the shared code
  (which then becomes their attempt), and "Back to your own code" brings theirs back. A link
  whose code can't be read says so.
- **Pages for search engines and shared links** ([pages.ts](../scripts/lib/pages.ts)). Search
  engines don't read what comes after the #, so the build gives each language a page of its own
  (`python/`, `ruby/`, …) with its title, description, canonical address and a preview image for
  shared links (`public/social/`), and its path (groups and koan titles) as plain HTML. The home
  page gets the same, listing the languages, plus `sitemap.xml` and `robots.txt`. The app is the
  same on every page: on a language's page it opens that language's path and changes the address
  to the site's own (`#/python/`), so everything after works as before. The plain HTML is hidden
  while scripts run (the app replaces it), and shown without them.

## Browser tests

`npm run test:browser` builds the site, serves it, and drives the Chrome and Firefox installed on
the machine through every language's koan flow: a failing koan, its solution, an error, an
infinite loop. It also checks what each page downloads (and that nothing comes from anywhere but
the site), old addresses, export and import, two
tabs sharing progress, every language working offline once opened (with its server stopped, in a
freshly loaded page), the languages' own pages and the sitemap, (in Chrome) the download
message on a slowed-down first visit, sharing a koan with its code (a link's round trip), and accessibility: [axe](https://github.com/dequelabs/axe-core)
checks each kind of page against WCAG 2.2 A and AA, in both themes, on a desktop and a phone, and
any finding fails.
It takes several minutes per browser.

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

koans.app itself is published by [deploy.yml](../.github/workflows/deploy.yml) on every push to
`main`: GitHub runs all of the above, then uploads `dist/` to **Cloudflare Pages** (project
`koans-app`) with Cloudflare's `wrangler`, using the repository secrets `CLOUDFLARE_API_TOKEN`
(a token with *Account → Cloudflare Pages → Edit*) and `CLOUDFLARE_ACCOUNT_ID`. Only files that
changed are uploaded. [public/_headers](../public/_headers) sets Cloudflare's HTTP headers. To try the
build the way Cloudflare serves it: `npx wrangler pages dev dist`.

- The site serves its own copy of each interpreter, and its fonts (from the `@fontsource-variable`
  packages, in [src/fonts.css](../src/fonts.css)), so once published it doesn't depend on GitHub,
  Google or anyone else, and a visit sends no request anywhere but to the site. A changed interpreter can only affect a *new* build, and the lock stops that.
- The same build works at the root of a domain (`koans.app`) or in a sub-folder
  (`user.github.io/koans-app/`): its links are relative (`base: './'` in
  [vite.config.ts](../vite.config.ts)). It works on hosts with "pretty URLs" too, which redirect
  `…/index.html` to its folder: the service worker saves each page by its folder's address.
- Make sure `.wasm` files are served as `application/wasm`. The main hosts do this already.
- Offline mode needs HTTPS (or `localhost`): browsers only run service workers there.
- The pages' canonical addresses, sitemap and preview images use `site.url` in
  [src/site.ts](../src/site.ts) (`https://koans.app/`): change it if the site is published elsewhere.

## Icons and images

- **The gateless gate** (header, favicon, the README): vector art in
  [GateMark.svelte](../src/components/GateMark.svelte) and [public/favicon.svg](../public/favicon.svg),
  which switches to a light gate on dark browser tabs. After changing the SVG, regenerate the PNG
  icons (the installed app's too) with `design/build-favicons.sh` (needs ImageMagick).
- **The README's screenshots** (`.github/readme/`, one per theme; GitHub shows the one matching
  the reader's): taken from the built site by `npm run build && node design/build-readme-screenshots.mjs`.
  Take them again after a visible change to the koan page.
- **Preview images for shared links** (`public/social/`, 1200 × 630): drawn from each language's
  name, tagline, colours and emblem by `node design/build-social-images.mjs`, in the installed
  Chrome. Run it again after changing any of those, or adding a language.

## Known limitations

- Answers are checked in the browser, so a learner could "pass" a koan by deleting its
  assertions. That's fine for a learning tool.
- Each language's README lists what its interpreter can't do in a browser.
