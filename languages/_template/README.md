# Adding a language

This folder is a starting point for a new language. Copy it, follow the steps, and compare with the
three languages already here: [Raku](../raku/) (an interpreter from GitHub releases, a classic
worker), [Python](../python/) (an interpreter from npm, a module worker) and
[JavaScript](../javascript/) (no interpreter at all: the browser's own engine).

The template is left out of the type-check and the tests (`tsconfig.json`, `vite.config.ts`), and
the tools only know the languages listed in `scripts/lib/languages.mjs`, so nothing here runs.

## Before you start

- **It must run in the browser**, with no server: an interpreter compiled to WebAssembly, or
  JavaScript itself. Check its size (it's downloaded once per learner) and its license (it ships
  with the site, so it goes in `THIRD-PARTY-NOTICES.md`).
- **It must run under Node** too, the same build, so `npm run check:koans` and `npm test` check
  koans on the engine learners use.
- A language is listed on the site with **at least 30 checked koans** covering its basics.

## Steps

1. **Copy** this folder to `languages/<id>/` (`<id>` is lower case: it appears in addresses, like
   `#/<id>/`). Replace `lang-id`, `LANGUAGE` and every `TODO` in the copied files.
2. **The interpreter.** In `node.mjs`, say where it comes from (`runtime`) and how to load it under
   Node (`load`). Add an npm package to `package.json` if it comes from npm, then pin it:
   `npm run fetch-runtime -- --lang <id> --update`. That writes `runtime.lock.json`.
3. **The worker.** Move `worker.js` to `public/runtime/<id>/worker.js` and fill it in. It runs each
   koan in a fresh state and answers with the program's stdout and stderr, line by line.
4. **The prelude** (`prelude.<ext>`, run before every koan). It must:
   - make `___` a unique value, and make **every** assertion fail when given it, even pairs like
     `ok`/`nok` that want opposite truths;
   - provide assertions that print [TAP](https://testanything.org) and **carry on** after a failure:
     `ok N - message`, or `not ok N - message` followed by `# expected: …`, `#      got: …` and
     `# at web line N` (the koan's line, counted in the whole program) on stderr;
   - take up **one line**, so the koan's line numbers shift by exactly one. `node.mjs`'s
     `prelude()` folds or wraps it.

   Name the assertions after the language's own testing tools, so learners meet what they'll use.
5. **The app's side.** Fill in `pack.ts` (name, wording, worker, how errors give their line) and
   `content.ts` (the koans and a CodeMirror mode).
6. **Register** the language in [scripts/lib/languages.mjs](../../scripts/lib/languages.mjs) and
   [languages/index.ts](../index.ts).
7. **The koans**, in `koans/NN-section/`: a `_section.json` per group, and a koan with its
   `.solution` per file pair. See [Writing koans](../../README.md#writing-koans) and
   [CONTRIBUTING.md](../../CONTRIBUTING.md).
8. **Check.** `npm run check:koans -- --lang <id>` checks every koan and solution;
   `tap.test.ts` (fill it in) checks how the app reads the interpreter's real output; `npm test`
   runs it all, including every koan through the app's own code. Then try the language in Chrome
   and Firefox: a failing koan, a solved one, an error, an infinite loop.
9. **Document.** Write `README.md` (the path, the assertions, how a koan runs, the language's own
   rules for blanks, its limitations), add the language to the table in the main README, and add
   the interpreter to `scripts/third-party-notices.mjs`, then run `npm run notices`.
