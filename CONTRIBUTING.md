# Contributing to koans.app

Thank you for helping. There are four kinds of contribution, from smallest to largest:

- **Fix a koan**: a typo, an unclear intro, a misleading description, a wrong fact.
- **Write koans** for a language that's already here.
- **Add a language**: see [languages/_template/](languages/_template/README.md).
- **Improve the site** itself (`src/`, `scripts/`).

How a koan is put together is below; how to run and build the site is in
[docs/DEVELOPMENT.md](docs/DEVELOPMENT.md).

Not ready to change things yourself? [Open an issue](https://github.com/hankache/koans-app/issues/new/choose)
to report a problem with a koan, suggest a language, or propose a koan: each has a short form. Every
koan's page also has a "Report a problem with this koan" link, which fills in which koan it is.

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

## Writing a good koan

A koan teaches **one idea**, through a handful of small failing tests that the learner fixes one
at a time. When writing one:

- **Keep it short.** Five to eight assertions. If a koan wants more, it's probably two koans.
- **Go from plain to surprising.** Start with what the intro just said, then let the koan reveal
  something the learner wouldn't guess: `-7 // 2` in Python, `[10, 1, 2].sort()` in JavaScript.
- **The intro gives what the koan needs.** One or two sentences, with code in backticks. A learner
  who reads it should be able to fill every blank by thinking, not by searching.
- **Each assertion's message is the lesson**, written as a short statement: `'// rounds down'`,
  `'a set holds each value once'`. It's what the learner reads next to a passed or failed check.
  Words in it that are code in the koan (`toEqual`, `NaN`, `.not`) are shown as code by
  themselves; plain English words that are also keywords (`is`, `in`, `not`) stay text. Put a word
  in backticks to force it either way, and run `npm run check:koans -- --words` to see what's
  marked ([scripts/lib/code-words.mjs](scripts/lib/code-words.mjs) has the rules).
- **Answers are short** and written the way the language writes values: `[1, 2, 3]`, `'text'`,
  `TypeError`.
- **Don't depend on one interpreter's quirks**: exact error-message wording, how many digits a float
  prints in one engine, the order of things the language doesn't promise to order. The koans run on
  one interpreter per language, but they should be true of the language.
- **Follow the [rules for blanks](#rules-for-blanks)**, plus the language's
  own, in its README (for example, [Raku's](languages/raku/README.md#rules-for-raku-blanks)).
- **Renaming or moving a koan resets** the progress of everyone who solved it: its id is its
  group's folder and its file name, without the numbers. Renumbering is free.

Write the koan with `___` blanks, and its solution beside it with each `___` replaced by its
answer and nothing else changed.

## Adding a language

[languages/_template/](languages/_template/README.md) is a starting point, with step-by-step
instructions. In short, a language is a folder in `languages/` with two descriptions of it, one for
the build tools and one for the app, plus the files they point to:

| File                                  | What it is                                                                 |
|---------------------------------------|----------------------------------------------------------------------------|
| `languages/<id>/node.mjs`             | For the tools: koan extension and comment style, prelude, epilogue, lint, where the interpreter is released, how to run it under Node. The type is in [scripts/lib/languages.mjs](scripts/lib/languages.mjs) |
| `languages/<id>/pack.ts`              | For the app: name and wording, its look (accent colours and emblem), its path page's description and site link, a line of code for its tile and an optional koan to try, worker, highlighting, error formats. The type is in [src/lib/language.ts](src/lib/language.ts) |
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

## Before you send a change

```sh
npm run check:koans    # every koan fails on each blank and its solution passes
npm test               # how the app reads results, reveals answers and saves progress
npm run check          # type-checks the app
```

For a change to koans, `npm run check:koans -- --lang <id>` checks only that language. For a
change to the site or to how a koan runs, also run `npm run test:browser`, which checks the built
site in Chrome and Firefox, and try the change yourself with `npm run dev`.

Describe what you changed and why, in plain words, in the commit message.

## Licensing

Contributions are accepted under the project's licenses, with no agreement to sign:

- **Koans** (the koans, their solutions, and the groups' titles and blurbs): [CC BY-SA 4.0](LICENSE-CONTENT).
- **Code**, including each language's prelude and worker, and its emblem: [Artistic License 2.0](LICENSE).

By sending a contribution, you agree that it's your own work, or that you have the right to
contribute it under these licenses.

**Material from elsewhere.** You may adapt examples from sources whose license allows it, such as
other CC BY-SA or permissively licensed material, crediting them in the language's README (as
Raku's credits [raku.guide](https://raku.guide)). Don't copy from sources under a "NonCommercial"
or "NoDerivatives" license, or with no license at all: their terms can't be combined with this
project's. Other koan projects are a common case of this, so check their licenses before
borrowing from one.

The name "koans.app" and the gateless gate mark identify this project; see the README.
