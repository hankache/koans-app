# Contributing to koans.app

Thank you for helping. Contributions come in four sizes:

- **Fix a koan:** a typo, an unclear intro, a misleading description, a wrong fact.
- **Write koans** for a language that's already here.
- **Add a language:** start from [languages/_template/](languages/_template/README.md).
- **Improve the site** itself (`src/`, `scripts/`).

This guide covers the koans. To run, build and test the site, see
[docs/DEVELOPMENT.md](docs/DEVELOPMENT.md).

Not ready to change things yourself? [Open an issue](https://github.com/hankache/koans-app/issues/new/choose)
to report a problem, suggest a language or propose a koan; each has a short form. Every koan's page
also has a **Report a problem with this koan** link, which fills in which koan it is.

## Writing koans

### The koan format

Each koan is a pair of files in a numbered group folder:

```
languages/raku/koans/
  05-lists-and-hashes/
    _section.json              { "title": "Lists and hashes", "blurb": "…" }
    03-hashes.raku              the koan, with ___ blanks
    03-hashes.solution.raku     the same code, filled in
```

Only each blank's answer reaches the browser, never the whole solution. A koan starts with a title
and an intro, in the language's comment style, followed by code that uses its test library:

```raku
# title: Hashes
# intro: A hash, marked by the `%` sigil, maps keys to values.
my %capitals = UK => 'London', Germany => 'Berlin';
is %capitals<UK>, ___, 'look up a key';
```

- **Code in an intro** goes in backticks (`` `%capitals` ``), and is shown in the code font. Use
  double backticks for code that contains a backtick (``` ``#`( )`` ```).
- **A new group** is a folder with a numeric prefix and a `_section.json` holding its title and a
  one-line description (`blurb`).
- **Numeric prefixes set the order** but are dropped from ids (`lists-and-hashes/hashes`), so
  renumbering is free. Renaming a koan, or moving it to another group, gives it a new id and
  resets the progress of everyone who solved it.

### Rules for blanks

- **The solution lines up with the koan:** the same lines, with each `___` replaced by its answer
  and nothing else changed. The answer the result panel reveals relies on this, and the checker
  rejects a koan that doesn't line up.
- **At most one `___` per line.**
- **Each `___` is directly an argument** of an assertion: the expected value, a type, a regex, a
  code block or a named argument. Inside an expression, the prelude can't catch it, and the koan
  may stop with an error instead of failing the test.
- **The `___` stays on the line the interpreter reports** for its assertion. "Meditate on line N"
  is found by looking for the `___` on that line.

Each language's README adds rules of its own, such as
[Raku's](languages/raku/README.md#rules-for-raku-blanks). SQL, which has no assertions, has
[different rules](languages/sql/README.md#rules-for-sql-blanks).

### Checking your koans

```sh
npm run check:koans
npm test
```

`check:koans` runs every koan and its solution, under Node, on the same interpreter the browser
uses. Each line with a `___` must fail on its own while unfilled, each solution must pass, and the
language's own lint must pass. `npm test` then reads the koans the way the app does: the answer
revealed for each failing line must be right, and revealing every answer must give the solution.

## Writing a good koan

A koan teaches **one idea**, through a handful of small failing tests that the learner fixes one at
a time.

- **Keep it short:** five to eight assertions. A koan that needs more is probably two koans.
- **Go from plain to surprising.** Start with what the intro just said, then reveal something the
  learner wouldn't guess: `-7 // 2` in Python, `[10, 1, 2].sort()` in JavaScript.
- **The intro gives what the koan needs,** in one or two sentences. A learner who reads it should
  be able to fill every blank by thinking, not by searching.
- **Each assertion's message is the lesson,** written as a short statement: `'// rounds down'`,
  `'a set holds each value once'`. It's what the learner reads beside each passed or failed test.
  Words that are code in the koan (`toEqual`, `NaN`, `.not`) are shown as code automatically;
  English words that are also keywords (`is`, `in`, `not`) stay text. Backticks force either way,
  and `npm run check:koans -- --words` lists what's marked (the rules are in
  [scripts/lib/code-words.mjs](scripts/lib/code-words.mjs)).
- **Answers are short,** written the way the language writes values: `[1, 2, 3]`, `'text'`,
  `TypeError`.
- **Describe the language as it is,** without "since version X" or "new in X". Learners run the
  current interpreter, and version history dates a koan without teaching anything.
- **Don't rely on one interpreter's quirks:** the exact wording of error messages, how many digits
  one engine prints for a float, the order of things the language doesn't promise to order. Each
  language runs on one interpreter here, but its koans should be true of the language.

## Adding a language

[languages/_template/](languages/_template/README.md) is the starting point, with step-by-step
instructions. In short, a language is a folder in `languages/` that describes it twice, once for
the build tools and once for the app, plus the files those descriptions point to:

| File                               | What it is                                                                 |
|------------------------------------|----------------------------------------------------------------------------|
| `languages/<id>/node.mjs`          | For the build tools: koan file extension and comment style, prelude, epilogue, lint, where the interpreter comes from and how to run it under Node. Its type is in [scripts/lib/languages.mjs](scripts/lib/languages.mjs) |
| `languages/<id>/pack.ts`           | For the app: name and wording, look (accent colors and emblem), path-page description and site link, home-page tile and koans to try, worker, highlighting, error formats. Its type is in [src/lib/language.ts](src/lib/language.ts) |
| `languages/<id>/prelude.*`         | Run before every koan                                                      |
| `languages/<id>/runtime.lock.json` | The pinned interpreter release, written by `fetch-runtime --update`        |
| `languages/<id>/koans/`            | The koans                                                                  |
| `languages/<id>/tap.test.ts`       | Tests of how the app reads the interpreter's real output                   |
| `languages/<id>/README.md`         | The path, the language's own rules for blanks, its limitations             |
| `public/runtime/<id>/worker.js`    | Runs the interpreter in a Web Worker, speaking the protocol in [wasm-runtime.ts](src/lib/runtime/wasm-runtime.ts) |

Then register it in [scripts/lib/languages.mjs](scripts/lib/languages.mjs) and
[languages/index.ts](languages/index.ts).

**Every language must:**

1. Make `___` a unique value that fails any assertion it's given, including pairs like `ok` and
   `nok` that want opposite truths.
2. Print its test results as TAP, with `# expected:` and `# got:` diagnostics and
   `# at web line N` for the learner's line. A language without a TAP library gets a small one in
   its prelude.
3. Report errors outside the tests with a line number that the pack's `errors.line` pattern can
   find.
4. Let a running program be stopped at any moment, by terminating its worker.

## Before you send a change

```sh
npm run check:koans    # every blank fails while unfilled, and every solution passes
npm test               # how the app reads results, reveals answers and saves progress
npm run check          # type-checks the app
```

For koans in one language, `npm run check:koans -- --lang <id>` is enough. For a change to the site
or to how koans run, also run `npm run test:browser`, which checks the built site in Chrome and
Firefox, and try the change yourself with `npm run dev`.

Explain what you changed, and why, in the commit message.

## Licensing

Contributions are accepted under the project's licenses:

- **Koans**, including their solutions and the groups' titles and descriptions:
  [CC BY-SA 4.0](LICENSE-CONTENT).
- **Code**, including each language's prelude, worker and emblem: [Artistic License 2.0](LICENSE).

By sending a contribution, you confirm that it's your own work, or that you have the right to
contribute it under these licenses.

**Material from elsewhere.** You may adapt examples from sources whose license allows it, such as
other CC BY-SA or permissively licensed material, crediting them in the language's README (as
Raku's credits [raku.guide](https://raku.guide)). Don't copy from sources under a "NonCommercial"
or "NoDerivatives" license, or with no license at all: their terms can't be combined with this
project's. Other koan projects often fall into this group, so check a project's license before
borrowing from it.

The name "koans.app" and the gateless gate mark identify this project; see the
[README](README.md#license).
