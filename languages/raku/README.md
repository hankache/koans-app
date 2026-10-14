<p align="center">
  <img src="../../public/logo.webp" alt="Raku Koans: a butterfly beside a torii gate framing a question mark" width="160">
</p>

# Raku

Learn Raku from syntax to culture through 105 koans. They're written with Raku's `Test` module,
so you learn the language and how to test it at the same time.

The koans run on Raku.js, the [Raku++](https://github.com/ash/rakupp) interpreter compiled to
WebAssembly. They started as [Raku Koans](https://hankache.github.io/raku-koans/).

## The path

The koans follow [raku.guide](https://raku.guide), extended with topics from the
[Raku documentation](https://docs.raku.org) that the guide leaves out, such as pairs, sets,
supplies, parametric roles and grammars.

| #  | Group                               | Koans | Covers                                                          |
|----|-------------------------------------|-------|-----------------------------------------------------------------|
| 1  | Awakening                           | 6     | the `Test` module, syntax, truth                                |
| 2  | Numbers                             | 7     | arithmetic, comparison, coercion, exact numbers, bases          |
| 3  | Strings                             | 7     | quoting, heredocs, formatting, methods, smartmatch              |
| 4  | Variables                           | 6     | sigils, types, introspection, scope, binding, dynamic variables |
| 5  | Lists and hashes                    | 8     | arrays, ranges, hashes, pairs, sorting, reduction               |
| 6  | Sets, subsets and enums             | 3     | set operators, subset types, enums                              |
| 7  | Control flow                        | 7     | `if` to `loop`, loop control and phasers                        |
| 8  | Subroutines                         | 8     | signatures, multiple dispatch, your own operators               |
| 9  | Functional programming              | 8     | chaining, feeds, hyper and meta-operators, closures             |
| 10 | Junctions, laziness and concurrency | 7     | lazy lists, `gather`, parallelism, supplies, channels           |
| 11 | Objects                             | 7     | classes, encapsulation, constructors, methods                   |
| 12 | Inheritance and roles               | 7     | parents, roles, parametric roles, mixins, introspection         |
| 13 | Exceptions                          | 3     | catching, throwing, your own exceptions                         |
| 14 | Regular expressions                 | 9     | matching, captures, substitution, named regexes                 |
| 15 | Grammars                            | 7     | tokens and rules, the match tree, actions, proto tokens         |
| 16 | Text and the world                  | 5     | Unicode, `say` and `print`, files and directories               |

## Files

```
node.mjs            Raku for the build tools: prelude folding, epilogue, lint, running Raku.js under Node
pack.ts             Raku for the app: wording, artwork, worker, highlighting, error formats
prelude.raku        run before every koan: makes ___ a unique value and wraps Test's assertions
highlight.ts        the editor's Raku mode, a port of Ace's (words.ts holds its word lists)
runtime.lock.json   the pinned Raku++ release and the checksums of its files
tap.test.ts         how the app reads Raku++'s real output
koans/              the koans
```

The worker that runs Raku.js in the browser is
[public/runtime/raku/worker.js](../../public/runtime/raku/worker.js); `npm run fetch-runtime` puts
the interpreter beside it.

## How the prelude works

[prelude.raku](prelude.raku) makes `___` a unique value and wraps every `Test` assertion so that
any assertion given a `___` fails, whichever it is (`nok`, `isnt`, `throws-like`, `like`,
`cmp-ok`, etc.). It also reports the learner's line with each failure (`# at web line N`).

The build folds the prelude onto one line, so error line numbers shift by exactly one, and the
koan runs inside a block the epilogue closes. Because of the folding, the prelude can't have a
trailing `#` comment on a code line: it would comment out the rest.

## Rules for Raku blanks

On top of [the rules for every language](../../README.md#rules-for-blanks):

- Compare **types, `Any` and `Nil` with `is-deeply`**, never `is`. `is` compares strings, and every
  type object stringifies to an empty string, so `is $x.WHAT, Int` would accept any type.
  `npm run check:koans` rejects it.
- Keep an assertion that contains a blank **on one line**. Raku reports a statement's first line.

## Known limitations

- Raku.js runs in the browser: there's no network access, concurrency is limited, and recursion
  tops out at about 200 levels.
- Not covered: installing modules and the Native Calling Interface (neither can run in a browser),
  and the terminal parts of I/O (`get`, `prompt`, `run`, `shell`). File I/O works against an
  in-memory filesystem.
- Raku++ differs from Rakudo in a few places, so the koans avoid these differences.

## Credits

- Many koans adapt examples from [raku.guide](https://raku.guide) (CC BY-SA 4.0).
- The koans run on [Raku++](https://github.com/ash/rakupp) compiled to WebAssembly as Raku.js.
- The editor's Raku highlighting is adapted from [Ace](https://github.com/ajaxorg/ace)'s Raku mode
  (BSD 3-Clause).
