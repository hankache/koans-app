# Developing koans.app

How to run the site, how it works, and how it's tested and published. For writing koans or adding
a language, see [CONTRIBUTING.md](../CONTRIBUTING.md); for what the site is, see the
[README](../README.md).

## Running it locally

Requires [Node.js](https://nodejs.org) 22.18 or newer (the build reads TypeScript with Node itself).

```sh
npm install
npm run fetch-runtime   # downloads each language's interpreter (see Interpreters, below)
npm run dev             # http://localhost:5173
```

| Command                 | What it does                                                        |
|-------------------------|---------------------------------------------------------------------|
| `npm run dev`           | Starts a development server that reloads the page as code changes  |
| `npm run build`         | Builds the site into `dist/`                                        |
| `npm run preview`       | Serves the built site at http://localhost:4173                      |
| `npm run check:koans`   | Runs every koan and its solution on its interpreter                 |
| `npm test`              | Tests how the app reads results, reveals answers and saves progress |
| `npm run test:browser`  | Builds the site and checks it in Chrome and Firefox                 |
| `npm run check`         | Type-checks the app                                                 |
| `npm run fetch-runtime` | Downloads the pinned interpreters into `public/runtime/<language>/` |
| `npm run notices`       | Regenerates `THIRD-PARTY-NOTICES.md` after dependencies change      |

`build:koans`, `check:koans` and `fetch-runtime` work on every language, or only on those named:
`npm run check:koans -- --lang raku`.

The dev server compiles the koan list when it starts: restart it after adding or editing koans. It
doesn't use the service worker, so offline mode and download progress need a built site
(`npm run build`, then `npm run preview`).

## Project layout

```
languages/          one folder per language: its koans, prelude, highlighting and interpreter setup
  index.ts            the languages the app offers
  <id>/               a language; see its README.md
  _template/          the starting point for a new language
src/                the app (Svelte 5 and TypeScript)
  components/         the home page, the path, the koan page, the editor, the result panel, the emblems
  lib/                addresses, opened languages (course.ts), running koans, reading their results,
                      progress and its export, sharing, offline mode, the language-pack interface
  sw.js               the service worker, completed by the build (vite.config.ts)
public/             static files: icons, link-preview images, each language's interpreter worker
  runtime/<id>/       a language's worker.js, with its interpreter beside it (downloaded)
scripts/            build and check tools: koan lists, the koan checker, interpreter downloads, notices
  lib/languages.mjs   the languages the tools know about
  lib/pages.ts        the pages for search engines and shared links, added to the build
tests/              tests of the app's own logic, run on real interpreter output; browser tests
design/             scripts for the site's icons and images, and the README's screenshots
docs/               this file
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

### Running a koan

- **Blanks.** Each language's prelude makes `___` a unique value and wraps its test library's
  assertions, so any assertion given a `___` fails, whichever it is.
- **Results.** Every language's tests print [TAP](https://testanything.org): `ok N - …`,
  `not ok N - …`, `# expected: …`, `# got: …`, and `# at web line N` for the learner's line.
  [tap.ts](../src/lib/tap.ts) reads it: which tests passed, the first failure and its line, the
  learner's answer against the language's, subtests, `todo` and `skip`. Errors outside the tests
  are read with each language's own patterns.
- **Runaway code.** An interpreter runs a program to completion without pausing, so it runs in a
  Web Worker. After 8 seconds the worker is stopped and replaced
  ([wasm-runtime.ts](../src/lib/runtime/wasm-runtime.ts)).
- **Highlighting.** The editor is [CodeMirror 6](https://codemirror.net), with each language's mode.

### The app

- **Addresses** ([route.ts](../src/lib/route.ts)): `#/` is the home page, `#/<language>/` a
  language's path and `#/<language>/koan/<section>/<name>` a koan. Old Raku Koans addresses
  (`#/koan/…`) lead to the same Raku koan.
- **The home page** offers a one-blank koan to try by tapping an answer (the packs' `teasers`), a
  "continue" card for the unsolved koan worked on last, a tile per language and, out of the way,
  export and import. It's designed for phones first.
- **Loading.** The home page loads no language. Opening one loads its koans and editor mode (a
  separate file of the build, `languages/<id>/content.ts`) and starts downloading its interpreter
  ([course.ts](../src/lib/course.ts)). The home page counts progress from
  `src/generated/summary.json`, which lists every language's koan ids.
- **Progress** ([progress.svelte.ts](../src/lib/progress.svelte.ts)) is stored per language in the
  browser's IndexedDB, one koan at a time, so tabs open side by side don't overwrite each other and
  each shows the others' progress as it happens. It stays on one device; clearing the site's data
  resets it. "Start over" on a language's path erases that language's progress.
- **Export and import** ([transfer.ts](../src/lib/transfer.ts)): the home page saves all progress
  to a JSON file (`"format": "koans.app/progress"`) and reads one back, keeping the newer entry for
  each koan. Damaged entries and unknown languages are skipped.
- **Sharing a koan** ([share.ts](../src/lib/share.ts)): Share puts the editor's code in a link,
  compressed, after the `#` (`#/python/koan/numbers/division?code=…`), so it never reaches the
  server and nothing is stored: whoever has the link has the code. On a phone, Share opens the
  share sheet; elsewhere it copies the link. Opening a link shows its code with a note to read it
  before running it. The learner's own code stays saved until they run the shared code, which then
  becomes their attempt, and "Back to your own code" restores theirs. A link whose code can't be
  read says so.

### Offline and loading

- **Offline** ([sw.js](../src/sw.js), [offline.ts](../src/lib/offline.ts)): in a built site, a
  service worker saves the page, the code it starts with and its fonts, then each language's koans
  and interpreter the first time it's opened. A language opened once works offline and isn't
  downloaded again. The page itself comes from the network when it can (within 4 seconds), so a
  new version shows at once. Each interpreter is saved under a hash of its folder in
  `public/runtime/`, so an update replaces the old copy, and one the learner had opened is fetched
  again in the background. On a first visit, the interpreter waits up to 3 seconds for the service
  worker, so its files are saved too. The site installs as an app (`manifest.webmanifest`).
- **While an interpreter loads,** the koan page says so: "Downloading Python… 6.1 of 13.5 MB",
  then "Starting Python…". The service worker reports each file's progress as it streams in. The
  total is the interpreter's folder, minus source maps, licenses and the files its `node.mjs`
  lists as `onDemand` (loaded only when needed). Without a service worker (the dev server, or a
  first visit where it was slow to take over), the page just says "Preparing Python…".

### Search engines and shared links

[pages.ts](../scripts/lib/pages.ts) gives search engines what the app alone can't, since they
ignore everything after the `#`:

- **A page per language** (`python/`, `ruby/`, …) with its own title, description, canonical
  address and preview image for shared links (`public/social/`), and its path (groups and koan
  titles) as plain HTML. The home page gets the same, listing the languages.
- **`sitemap.xml` and `robots.txt`.**

Every page runs the same app. On a language's page, it opens that language's path and switches the
address to the site's own (`#/python/`), so everything after works as usual. The plain HTML is
hidden while scripts run (the app replaces it) and shown without them.

## Browser tests

`npm run test:browser` builds the site, serves it, and drives the Chrome and Firefox installed on
the machine. It checks:

- every language's koan flow: a failing koan, its solution, an error and an infinite loop;
- what each page downloads, and that nothing comes from anywhere but the site;
- old addresses, export and import, and two tabs sharing progress;
- every language working offline once opened, with the server stopped and the page freshly loaded;
- the languages' own pages and the sitemap;
- sharing a koan, through a link's full round trip;
- the download message on a slowed-down first visit (Chrome only);
- accessibility: [axe](https://github.com/dequelabs/axe-core) checks each kind of page against
  WCAG 2.2 A and AA, in both themes, on desktop and phone sizes. Any finding fails the run.

It takes several minutes per browser. `-- --browser chrome` (or `firefox`) runs one browser. Set
`CHROME_PATH` or `FIREFOX_PATH` if a browser isn't in its usual place; a browser that isn't found
is skipped with a warning. CI runs these checks on every change, before publishing.

## Interpreters

Each interpreter comes from its official releases. `languages/<id>/runtime.lock.json` pins the
release and the checksums of its files, and `npm run fetch-runtime` stops if anything differs. A
language's `node.mjs` names one of three kinds of source:

- **A GitHub release zip** (Raku), also checked against the checksum published with the release.
- **An npm package** (Pyodide for Python, the Acorn parser for JavaScript, the TypeScript
  compiler), installed by `npm install`, checked against `package-lock.json`, then copied.
- **An npm package not worth installing** (ruby.wasm, too large; wasmoon, with dependencies of its
  own; sql.js and php-wasm, with many builds; webR, with its demo app's dependencies). Its tarball
  is downloaded from the npm registry and checked against the integrity hash the registry
  publishes.

Interpreter files aren't committed; the build fetches them. To move a language to a newer release:

```sh
npm run fetch-runtime -- --lang raku --update     # the latest release, or: --update v5.1.0
npm run check:koans -- --lang raku                # every koan must still pass
npm test
```

For an npm package, install the new version first (`npm install --save-dev pyodide@<version>`);
`--update` then pins what's installed.

## Publishing

`npm run build` produces a static site in `dist/` that can be hosted anywhere. A build for
publishing runs:

```sh
npm ci
npm run fetch-runtime
npm run check:koans
npm test
npm run build
node tests/browser/run.mjs   # then publish dist/
```

koans.app itself is published by [deploy.yml](../.github/workflows/deploy.yml) on every push to
`main`. GitHub runs all of the above, then uploads `dist/` to **Cloudflare Pages** (project
`koans-app`) with Cloudflare's `wrangler`, using two repository secrets: `CLOUDFLARE_API_TOKEN` (a
token with *Account → Cloudflare Pages → Edit*) and `CLOUDFLARE_ACCOUNT_ID`. Only changed files
are uploaded. [public/_headers](../public/_headers) sets Cloudflare's HTTP headers. To serve the
build the way Cloudflare does: `npx wrangler pages dev dist`.

- **Self-contained.** The site serves its own interpreters and its own fonts (the
  `@fontsource-variable` packages, in [src/fonts.css](../src/fonts.css)). Once published, it
  depends on no one else, and a visit sends no request anywhere but to the site. A changed
  interpreter release can only reach a *new* build, where the lock stops it.
- **Any address.** The same build works at the root of a domain (`koans.app`) or in a sub-folder
  (`user.github.io/koans-app/`): its links are relative (`base: './'` in
  [vite.config.ts](../vite.config.ts)). Hosts with "pretty URLs", which redirect `…/index.html` to
  its folder, work too: the service worker saves each page under its folder's address.
- **Hosting requirements.** `.wasm` files must be served as `application/wasm` (the main hosts do
  this), and offline mode needs HTTPS (or `localhost`), the only place browsers run service workers.
- **The site's address.** Canonical addresses, the sitemap and preview images use `site.url` in
  [src/site.ts](../src/site.ts) (`https://koans.app/`). Change it to publish elsewhere.

## Icons and images

- **The gateless gate** (header, favicon, README): vector art in
  [GateMark.svelte](../src/components/GateMark.svelte) and [public/favicon.svg](../public/favicon.svg),
  which switches to a light gate on dark browser tabs. After changing the SVG, regenerate the PNG
  icons, including the installed app's, with `design/build-favicons.sh` (needs ImageMagick).
- **Link-preview images** (`public/social/`, 1200 × 630), drawn from each language's name, tagline,
  colors and emblem by `node design/build-social-images.mjs` in the installed Chrome. Run it again
  after changing any of those, or after adding a language.
- **The README's screenshots** (`.github/readme/`, one per theme; GitHub shows the one matching the
  reader's), taken from the built site by
  `npm run build && node design/build-readme-screenshots.mjs`. Retake them after a visible change
  to the koan page.

## Known limitations

- Answers are checked in the browser, so a learner could "pass" a koan by deleting its assertions.
  That's fine for a learning tool.
- Each language's README lists what its interpreter can't do in a browser.
