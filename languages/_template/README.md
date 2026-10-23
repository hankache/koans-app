# Adding a language

This folder is the starting point for a new language: copy it and follow the steps below. The
languages already here show the main kinds of interpreter:

- [Raku](../raku/): an interpreter from GitHub releases, in a classic worker.
- [Python](../python/): an interpreter from npm, in a module worker.
- [Ruby](../ruby/) and [PHP](../php/): an npm package downloaded rather than installed, with a
  fresh interpreter for every run.
- [JavaScript](../javascript/): no interpreter at all, only the browser's own engine.

The template is left out of the type-check and the tests (`tsconfig.json`, `vite.config.ts`), and
the tools only know the languages listed in `scripts/lib/languages.mjs`, so nothing here runs.

## Before you start

- **It must run in the browser,** with no server: an interpreter compiled to WebAssembly, or
  JavaScript itself. Check its size (each learner downloads it once) and its license (it ships with
  the site, so it goes in `THIRD-PARTY-NOTICES.md`).
- **It must run under Node** too, as the same build, so `npm run check:koans` and `npm test` check
  the koans on the engine learners use.
- **A language is listed on the site with at least 30 checked koans** covering its basics.

## Steps

1. **Copy** this folder to `languages/<id>/`, where `<id>` is lower case: it appears in addresses,
   such as `#/<id>/`. Replace `lang-id`, `LANGUAGE` and every `TODO` in the copied files.
2. **The interpreter.** In `node.mjs`, say where it comes from (`runtime`) and how to load it under
   Node (`load`). If it comes from npm, add the package to `package.json`. Then pin it with
   `npm run fetch-runtime -- --lang <id> --update`, which writes `runtime.lock.json`.
3. **The worker.** Move `worker.js` to `public/runtime/<id>/worker.js` and complete it. It runs each
   koan in a fresh state and answers with the program's output, line by line.
4. **The prelude** (`prelude.<ext>`, run before every koan). It must:
   - make `___` a unique value, and make **every** assertion fail when given it, even pairs like
     `ok` and `nok` that want opposite truths;
   - provide assertions that print [TAP](https://testanything.org) and **carry on** after a failure:
     `ok N - message`, or `not ok N - message` followed by `# expected: …`, `#      got: …` and
     `# at web line N` (the koan's line, counted in the whole program) on stderr;
   - take up **one line**, so the koan's line numbers shift by exactly one. The `prelude()` function
     in `node.mjs` folds or wraps it.

   Name the assertions after the language's own testing tools, so learners meet what they'll use.
5. **The app's side.** Complete `pack.ts` (name, wording, look, worker, how errors give their line)
   and `content.ts` (the koans and a CodeMirror mode).
6. **Register** the language in [scripts/lib/languages.mjs](../../scripts/lib/languages.mjs) and
   [languages/index.ts](../index.ts).
7. **The koans,** in `koans/NN-group/`: a `_section.json` per group, and each koan as a pair of
   files with its `.solution`. See [Writing koans](../../CONTRIBUTING.md#writing-koans).
8. **Check.** `npm run check:koans -- --lang <id>` checks every koan and solution; `tap.test.ts`
   (complete it) checks how the app reads the interpreter's real output; `npm test` runs it all,
   including every koan through the app's own code. Then add the language to `LANGUAGES` in
   [tests/browser/run.mjs](../../tests/browser/run.mjs), with an error and an infinite loop in it,
   and run `npm run test:browser` to try its koans in Chrome and Firefox.
9. **Images.** Draw its preview image for shared links with
   `node design/build-social-images.mjs`.
10. **Document.**
    - Write its `README.md`, with the sections every language's README has: The path, How the tests
      are written, How a koan runs, Rules for blanks, Files, Interpreter and Known limitations.
    - Add it to the languages table in the main [README](../../README.md).
    - Add its interpreter to `scripts/third-party-notices.mjs`, then run `npm run notices`.
