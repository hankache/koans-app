# Clojure

Learn Clojure from its data structures to its macros, through 79 koans written the way Clojure is
tested: with [`clojure.test`](https://clojure.github.io/clojure/clojure.test-api.html)'s `is`. They
run on [Scittle](https://github.com/babashka/scittle): SCI, the Small Clojure Interpreter, compiled
to JavaScript, about 200 KB compressed.

**Try it:** [koans.app/clojure/](https://koans.app/clojure/)

## The path

| #  | Group                               | Koans | Covers |
|---:|-------------------------------------|------:|--------|
| 1  | Awakening                           | 5     | `is`, truth, `nil`, equality, keywords and symbols |
| 2  | Numbers                             | 5     | arithmetic, `quot`, `rem` and `mod`, comparison, predicates, conversion |
| 3  | Strings                             | 5     | `str` and `subs`, `clojure.string`, searching and replacing, regular expressions, strings as sequences |
| 4  | Lists and vectors                   | 4     | vectors, lists, immutability, finding values |
| 5  | Maps                                | 5     | maps, `assoc` and `update`, nested maps, keys and values, transforming maps |
| 6  | Sets                                | 3     | sets, `clojure.set`, sorted collections |
| 7  | Sequences                           | 5     | the sequence abstraction, `range`, `take` and `drop`, combining, ordering, `into` |
| 8  | Map, filter and reduce              | 5     | `map` and `filter`, `reduce`, `some` and `every?`, grouping, `mapcat` and `for` |
| 9  | Functions                           | 7     | `defn`, arities, `fn` and `#()`, `partial`, `comp` and `juxt`, closures, `memoize` |
| 10 | Destructuring                       | 3     | sequences, maps, parameters |
| 11 | Control flow                        | 5     | `if` and `when`, `cond`, `case`, `if-let` and `if-some`, `let` |
| 12 | Threading macros                    | 2     | `->` and `->>`, `as->`, `some->` and `cond->` |
| 13 | Recursion and laziness              | 4     | `loop` and `recur`, lazy sequences, `take-while`, `lazy-seq` |
| 14 | State                               | 4     | atoms, `compare-and-set!` and watches, `delay` and `volatile!` |
| 15 | Records, protocols and multimethods | 5     | `defrecord`, `defprotocol`, `extend-protocol`, `defmulti`, `derive` |
| 16 | Macros                              | 4     | code as data, syntax quote, `defmacro`, `macroexpand` |
| 17 | Errors                              | 3     | `try`, `catch` and `finally`, `ex-info`, handling errors |
| 18 | Puzzles                             | 5     | FizzBuzz, word frequencies, anagrams, run-length encoding, Roman numerals |

## How the tests are written

```clojure
(is (= ___ (conj [1 2] 3)) "conj adds to the end")
(is (thrown? :default (case 5 1 :one)) "with no default, an unmatched case throws")
(testing "with small numbers" (is (= ___ (+ 1 2)) "addition"))
```

The prelude provides `is`, `testing` and `deftest`, as in `clojure.test`, and `str` for
`clojure.string`. `is` understands:

| Form | Passes when |
|------|-------------|
| `(is (= expected actual) "why")` | the two are equal; a failure shows both |
| `(is (thrown? :default body))` | the body throws; a class in place of `:default` checks the kind |
| `(is (thrown-with-msg? :default #"re" body))` | the body throws, with a message matching the pattern |
| `(is form "why")` | the form is true, that is neither `nil` nor `false` |

Unlike `clojure.test`, a failing `is` prints a TAP line and the koan carries on, so every blank is
checked; an `is` that still holds a `___` fails without running. Values in "Your answer" and
"Clojure says" are written with `pr-str`: `"text"`, `[1 2]`, `{:a 1}`.

## How a koan runs

- The worker, [public/runtime/clojure/worker.js](../../public/runtime/clojure/worker.js), gives
  every run a **fresh Scittle** (about 20 ms), so definitions a koan makes can't leak into the next
  run.
- The prelude comes first, folded onto one line (Clojure needs no newlines between forms), so the
  koan's line numbers shift by exactly one. `is` is a macro: it reads its own line from the form's
  metadata.
- An error the koan doesn't catch is reported with Scittle's message and its line.

Node imports the same worker for `check:koans` and `npm test`, running Scittle in a `vm` context of
its own for each run.

## Rules for Clojure blanks

On top of [the rules for every language](../../CONTRIBUTING.md#rules-for-blanks):

- A blank goes on a line where an `(is …)` starts; `npm run check:koans` rejects one anywhere
  else. Keep each `is` on one line.
- Give each `is` a message: it's what the learner sees beside the result.
- Don't require `clojure.test`: the prelude's `is` is the one that prints TAP.
- Scittle is ClojureScript, not the JVM. Catch errors with `(catch :default e …)`, and avoid what
  differs between the two: ratios (`(/ 1 3)` is a float here), `(= 1 1.0)`, characters as numbers,
  and Java classes and interop.
- The prelude is folded onto one line, so it must never end a code line with a `;` comment.

## Files

```
node.mjs            Clojure for the build tools: prelude, lint, running Scittle under Node
pack.ts             Clojure for the app: wording, look, worker, highlighting, error format
prelude.clj         run before every koan: ___, is, testing and deftest
runtime.lock.json   the pinned Scittle version and the checksums of its file
tap.test.ts         how the app reads Scittle's real output
koans/              the koans
```

## Interpreter

Scittle comes from the [`scittle`](https://www.npmjs.com/package/scittle) npm package: only
`dist/scittle.js`, checked against the registry's integrity hash and
[runtime.lock.json](runtime.lock.json). To move to a newer version:

```sh
npm run fetch-runtime -- --lang clojure --update        # the latest, or: --update 0.8.33
npm run check:koans -- --lang clojure
npm test
```

## Known limitations

- ClojureScript semantics: numbers are JavaScript doubles, there are no ratios or big integers,
  and characters are one-letter strings.
- No Java interop, no `clojure.core.async`, no `require` of other files.
- A long-running koan is stopped by the app's time limit, as in every language.
