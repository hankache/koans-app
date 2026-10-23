# Raku

Learn Raku from syntax to culture, through 105 koans written with Raku's own
[`Test`](https://docs.raku.org/type/Test) module, so you learn the language and how to test it at
the same time. They run on Raku.js: the [Raku++](https://github.com/ash/rakupp) interpreter,
compiled to WebAssembly.

**Try it:** [koans.app/raku/](https://koans.app/raku/)

## The path

The koans follow [raku.guide](https://raku.guide), extended with topics from the
[Raku documentation](https://docs.raku.org) that the guide leaves out, such as pairs, sets,
supplies, parametric roles and grammars.

| #  | Group                               | Koans | Covers |
|---:|-------------------------------------|------:|--------|
| 1  | Awakening                           | 6     | the `Test` module, syntax, truth |
| 2  | Numbers                             | 7     | arithmetic, comparison, coercion, exact numbers, bases |
| 3  | Strings                             | 7     | quoting, heredocs, formatting, methods, smartmatch |
| 4  | Variables                           | 6     | sigils, types, introspection, scope, binding, dynamic variables |
| 5  | Lists and hashes                    | 8     | arrays, ranges, hashes, pairs, sorting, reduction |
| 6  | Sets, subsets and enums             | 3     | set operators, subset types, enums |
| 7  | Control flow                        | 7     | `if` to `loop`, loop control and phasers |
| 8  | Subroutines                         | 8     | signatures, multiple dispatch, your own operators |
| 9  | Functional programming              | 8     | chaining, feeds, hyper and meta-operators, closures |
| 10 | Junctions, laziness and concurrency | 7     | lazy lists, `gather`, parallelism, supplies, channels |
| 11 | Objects                             | 7     | classes, encapsulation, constructors, methods |
| 12 | Inheritance and roles               | 7     | parents, roles, parametric roles, mixins, introspection |
| 13 | Exceptions                          | 3     | catching, throwing, your own exceptions |
| 14 | Regular expressions                 | 9     | matching, captures, substitution, named regexes |
| 15 | Grammars                            | 7     | tokens and rules, the match tree, actions, proto tokens |
| 16 | Text and the world                  | 5     | Unicode, `say` and `print`, files and directories |

## How the tests are written

With Raku's `Test` module, as Raku's own test suites are written. The expected value comes
**second**, and the description last:

```raku
my %capitals = UK => 'London', Germany => 'Berlin';
is %capitals<UK>, ___, 'look up a key';
is-deeply [1, 2, 3], ___, 'is-deeply compares structures, element by element';
```

The prelude wraps every `Test` assertion the koans use: `ok` and `nok`, `is` and `isnt`,
`is-deeply`, `is-approx`, `like` and `unlike`, `cmp-ok`, `isa-ok`, `does-ok` and `can-ok`,
`dies-ok` and `lives-ok`, `eval-dies-ok` and `eval-lives-ok`, and `throws-like`. A failing assertion prints its TAP line and the koan carries
on, as in any `Test` script, so every blank is checked.

## How a koan runs

- [prelude.raku](prelude.raku) makes `___` a unique value and wraps every `Test` assertion, so an
  assertion given a `___` fails, whichever it is. It also reports the learner's line with each
  failure (`# at web line N`).
- The build folds the prelude onto one line, so line numbers shift by exactly one, and the koan
  runs inside a block that the epilogue closes before `done-testing`.
- The worker, [public/runtime/raku/worker.js](../../public/runtime/raku/worker.js), loads Raku.js
  once (a classic worker, with `importScripts`) and runs each koan with it. If a run crashes, from
  very deep recursion for instance, the worker builds a fresh instance for the next one.

Node runs the same Raku.js for `check:koans` and `npm test`.

## Rules for Raku blanks

On top of [the rules for every language](../../CONTRIBUTING.md#rules-for-blanks):

- Compare **types, `Any` and `Nil` with `is-deeply`**, never `is`. `is` compares strings, and every
  type object stringifies to an empty string, so `is $x.WHAT, Int` would accept any type.
  `npm run check:koans` rejects it.
- Keep an assertion that holds a blank **on one line**: Raku reports a statement's first line.
- The prelude is folded onto one line, so it must never end a code line with a `#` comment: the
  comment would swallow the rest.

## Files

```
node.mjs            Raku for the build tools: prelude folding, epilogue, lint, running Raku.js under Node
pack.ts             Raku for the app: wording, look, worker, highlighting, error formats
prelude.raku        run before every koan: ___ and the wrapped Test assertions
highlight.ts        the editor's Raku mode, a port of Ace's (words.ts holds its word lists)
runtime.lock.json   the pinned Raku++ release and the checksums of its files
tap.test.ts         how the app reads Raku++'s real output
koans/              the koans
```

## Interpreter

Raku.js comes from [Raku++'s GitHub releases](https://github.com/ash/rakupp/releases).
`npm run fetch-runtime` downloads the release's `rakujs-<tag>.zip`, checks it against the checksum
published with the release and against [runtime.lock.json](runtime.lock.json), and takes out
`rakujs.js` and `rakujs.wasm` (13.5 MB, about 4 MB compressed). To move to a newer release:

```sh
npm run fetch-runtime -- --lang raku --update        # the latest, or: --update v5.4.1
npm run check:koans -- --lang raku
npm test
```

## Known limitations

- No network access, limited concurrency, and recursion that tops out at about 1,000 levels in
  Chrome (Firefox allows more).
- Not covered: installing modules and the Native Calling Interface, which can't run in a browser,
  and the terminal side of I/O (`get`, `prompt`, `run`, `shell`). File I/O works, on an in-memory
  file system.
- Raku++ differs from Rakudo in a few places; the koans steer clear of those differences.

## Credits

- Many koans adapt examples from [raku.guide](https://raku.guide) (CC BY-SA 4.0).
- The koans run on [Raku++](https://github.com/ash/rakupp), compiled to WebAssembly as Raku.js.
- The editor's Raku highlighting is adapted from the Raku mode of [Ace](https://github.com/ajaxorg/ace)
  (BSD 3-Clause).
