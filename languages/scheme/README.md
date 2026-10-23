# Scheme

Learn Scheme from its lists to its continuations, through 74 koans written the way Scheme is
tested: with [SRFI 64](https://srfi.schemers.org/srfi-64/srfi-64.html), its standard test library.
They run on [Stak](https://github.com/raviqqe/stak): a small R7RS Scheme written in Rust and
compiled to WebAssembly, under 200 KB compressed.

**Try it:** [koans.app/scheme/](https://koans.app/scheme/)

## The path

| #  | Group                     | Koans | Covers |
|---:|---------------------------|------:|--------|
| 1  | Awakening                 | 5     | tests, expressions, truth, `quote`, `eq?`, `eqv?` and `equal?` |
| 2  | Numbers                   | 4     | arithmetic, `quotient`, `remainder` and `modulo`, predicates, `expt`, `gcd` and conversions |
| 3  | Pairs and lists           | 5     | `cons`, `car` and `cdr`, lists as pairs, building, `list-ref` and `cadr`, `memq` and `member` |
| 4  | Strings and characters    | 4     | strings, characters, strings as lists, symbols |
| 5  | Vectors                   | 3     | vectors, `vector-set!` and copies, `vector-map` |
| 6  | Definitions               | 5     | `define` and `lambda`, rest parameters and `case-lambda`, `let` and `let*`, internal definitions and `set!`, multiple values |
| 7  | Control flow              | 4     | `if` and `cond`, `case`, `when`, `unless`, `and` and `or`, `do` |
| 8  | Recursion                 | 5     | recursion, on lists, tail calls, named `let`, mutual recursion and `letrec` |
| 9  | Trees                     | 3     | nested lists, flatten, mapping a tree |
| 10 | Higher-order procedures   | 5     | `map` and `for-each`, `filter` and `fold`, `find`, `any` and `every`, `apply`, procedures that return procedures |
| 11 | Closures and state        | 4     | closures, message passing, memoization, `make-parameter` and `parameterize` |
| 12 | Association lists         | 3     | `assq` and `assoc`, updating, counting |
| 13 | Records                   | 3     | `define-record-type`, modifiers, records in lists |
| 14 | Laziness                  | 3     | `delay` and `force`, streams, `make-promise` and `delay-force` |
| 15 | Continuations             | 3     | `call/cc`, early exit, `dynamic-wind` |
| 16 | Errors                    | 4     | `error` and `guard`, error objects, `raise`, `with-exception-handler` |
| 17 | Macros                    | 4     | quasiquote, `syntax-rules`, ellipses and recursive macros, hygiene |
| 18 | Ports                     | 2     | output and input string ports, `read` |
| 19 | Puzzles                   | 5     | FizzBuzz, quicksort, run-length encoding, Roman numerals, sets as lists |

## How the tests are written

```scheme
(test-equal "cons puts an item in front" ___ (cons 0 '(1 2)))
(test-error "car of a number" #t (car 5))
(test-group "with lists" (test-equal "length" ___ (length '(a b))))
```

The prelude provides SRFI 64's tests. Each takes its description first:

| Test | Passes when |
|------|-------------|
| `(test-equal "why" expected actual)` | the two are `equal?`; a failure shows both |
| `(test-eqv …)`, `(test-eq …)` | the same, comparing with `eqv?` or `eq?` |
| `(test-assert "why" x)` | `x` is true, that is anything but `#f` |
| `(test-error "why" #t body)` | the body raises; a predicate in place of `#t` checks what was raised |
| `(test-group "name" body …)` | groups tests: its name goes in front of their descriptions |

Unlike SRFI 64's, a failing test prints a TAP line and the koan carries on, so every blank is
checked; a test that still holds a `___` fails without running. Values in "Your answer" and
"Scheme says" are printed with `write`: `"text"`, `(1 2)`, `#\a`, `#(1 2)`.

The prelude imports `(scheme base)`, `(scheme write)`, `(scheme read)`, `(scheme char)`,
`(scheme cxr)`, `(scheme lazy)`, `(scheme case-lambda)` and `(srfi 1)`.

## How a koan runs

- The worker, [public/runtime/scheme/worker.js](../../public/runtime/scheme/worker.js), runs every
  koan as a new program, so definitions it makes can't leak into the next run.
- Stak gives a program's output back only when it ends, and loses it if the program fails; its
  errors carry no line. So the worker reads the koan first and rewrites it, without moving a line:
  each top-level form runs inside the prelude's `%run`, which reports an uncaught error with its
  line and stops the koan there, and each `(test-…)` learns its own line and whether it holds a
  blank. Unbalanced parentheses are reported with their line before anything runs.
- The prelude comes first, folded onto one line, so the koan's line numbers shift by exactly one.
  Stak has no separate error port, so the prelude marks its diagnostic lines, and the worker moves
  them to standard error.

Node imports the same worker for `check:koans` and `npm test`.

## Rules for Scheme blanks

On top of [the rules for every language](../../CONTRIBUTING.md#rules-for-blanks):

- A blank goes on a line where a `(test-…)` starts; `npm run check:koans` rejects one anywhere
  else. Keep each test on one line.
- Give each test a description: it's what the learner sees beside the result.
- Don't `import`: the prelude imports the libraries koans use.
- Write answers as R7RS says, and keep to what Stak gets right (see below): whole numbers below
  2⁵³, no `/` unless it divides exactly, and none of the SRFI 1 procedures listed below.
- The prelude is folded onto one line, so it must never end a code line with a `;` comment.

## Files

```
node.mjs            Scheme for the build tools: prelude, lint, running Stak under Node
pack.ts             Scheme for the app: wording, look, worker, highlighting, error format
prelude.scm         run before every koan: ___ and the SRFI 64 tests
runtime.lock.json   the pinned Stak version and the checksums of its files
tap.test.ts         how the app reads Stak's real output
koans/              the koans
```

## Interpreter

Stak comes from the [`@raviqqe/stak`](https://www.npmjs.com/package/@raviqqe/stak) npm package:
`stak_wasm.js` and `stak_wasm_bg.wasm`, checked against the registry's integrity hash and
[runtime.lock.json](runtime.lock.json). To move to a newer version:

```sh
npm run fetch-runtime -- --lang scheme --update        # the latest, or: --update 0.12.33
npm run check:koans -- --lang scheme
npm test
```

## Known limitations

Stak is small, and gives up some of the standard to stay that way:

- **Numbers:** no exact fractions (`(/ 7 2)` is `3.5`) and no big integers; `(round 2.5)` is `3`,
  and `2.0` prints as `2`.
- **Type errors:** many go unreported. `(car '())` and reading past the end of a vector give `0`,
  `(+ 1 "a")` gives `"a"`, and `(length 5)` never returns (the app stops it).
- **Errors:** a name that isn't defined is reported as "procedure expected" when called, and is
  `#f` when used as a value.
- **SRFI 1:** `take`, `drop`, `remove`, `delete`, `count`, `partition`, `filter-map`, `span`,
  `take-while` and `drop-while` are missing; `fold-right` and `delete-duplicates` give wrong
  results, and `any` gives `#t` rather than the predicate's value.
- **Other gaps:** no nested quasiquote, no quasiquote inside a vector, no `string-map` over several
  strings, no `\x41;` escapes in strings, and the symbol `first` prints as `car`.
