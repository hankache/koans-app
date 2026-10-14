# Contributing to koans.app

Thank you for helping. There are four kinds of contribution, from smallest to largest:

- **Fix a koan**: a typo, an unclear intro, a misleading description, a wrong fact.
- **Write koans** for a language that's already here.
- **Add a language**: see [languages/_template/](languages/_template/README.md).
- **Improve the site** itself (`src/`, `scripts/`).

The [README](README.md) explains how to run the site locally and how a koan is put together.

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
- **Answers are short** and written the way the language writes values: `[1, 2, 3]`, `'text'`,
  `TypeError`.
- **Don't depend on one interpreter's quirks**: exact error-message wording, how many digits a float
  prints in one engine, the order of things the language doesn't promise to order. The koans run on
  one interpreter per language, but they should be true of the language.
- **Follow the rules for blanks** in the [README](README.md#rules-for-blanks), plus the language's
  own, in its README (for example, [Raku's](languages/raku/README.md#rules-for-raku-blanks)).
- **Renaming or moving a koan resets** the progress of everyone who solved it: its id is its
  group's folder and its file name, without the numbers. Renumbering is free.

Write the koan with `___` blanks, and its solution beside it with each `___` replaced by its
answer and nothing else changed.

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
- **Code**, including each language's prelude and worker: [Artistic License 2.0](LICENSE).
- **Artwork**: [CC BY-SA 4.0](LICENSE-ARTWORK).

By sending a contribution, you agree that it's your own work, or that you have the right to
contribute it under these licenses.

**Material from elsewhere.** You may adapt examples from sources whose license allows it, such as
other CC BY-SA or permissively licensed material, crediting them in the language's README (as
Raku's credits [raku.guide](https://raku.guide)). Don't copy from sources under a "NonCommercial"
or "NoDerivatives" license, or with no license at all: their terms can't be combined with this
project's. Other koan projects are a common case of this, so check their licenses before
borrowing from one.

The name "koans.app" and the gateless gate mark identify this project; see the README.
