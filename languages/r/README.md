# R

Learn R from its vectors to its data frames, through 78 koans written the way R packages are
tested: with [testthat](https://testthat.r-lib.org)'s `test_that` and `expect_*`. They run on
[webR](https://docs.r-wasm.org/webr/latest/): R 4.6, compiled to WebAssembly.

**Try it:** [koans.app/r/](https://koans.app/r/)

## The path

| #  | Group           | Koans | Covers |
|---:|-----------------|------:|--------|
| 1  | Awakening       | 6     | expectations, everything is a vector, types, `NA` and `NULL`, equality, errors |
| 2  | Numbers         | 6     | arithmetic, integers and doubles, rounding, special values, conversion, sequences |
| 3  | Vectors         | 8     | recycling, indexing, changing, logical vectors, summaries, sorting, sets, vectorized thinking |
| 4  | Strings         | 6     | `paste`, measuring and cutting, formatting, splitting, regular expressions, dates |
| 5  | Factors         | 3     | factors, `table`, `cut` and ordered factors |
| 6  | Lists           | 5     | lists, changing them, nesting, flattening, names and stacking |
| 7  | Matrices        | 4     | matrices, matrix arithmetic, rows and columns, arrays and `outer` |
| 8  | Data frames     | 7     | data frames, selecting, adding columns, sorting, grouping, merging, built-in data |
| 9  | Control flow    | 4     | `if` and `ifelse`, loops, `switch`, vectorizing instead |
| 10 | Functions       | 8     | functions, defaults and `missing`, `...`, lazy evaluation, closures, the apply family, pipes, `Map`/`Filter`/`Reduce` |
| 11 | Objects         | 4     | attributes, S3 classes, generics and inheritance, S4 |
| 12 | Conditions      | 4     | warnings and messages, `tryCatch`, custom conditions, `on.exit` |
| 13 | Metaprogramming | 5     | `quote` and `eval`, `substitute`, `bquote` and `call`, environments, evaluating in data |
| 14 | Dates and times | 3     | date parts and `POSIXlt`, `difftime`, `seq` and `cut`, `POSIXct` times |
| 15 | Puzzles         | 5     | FizzBuzz, word frequencies, anagrams, run-length encoding, the sieve of Eratosthenes |

## How the tests are written

The testthat way, defined by [prelude.R](prelude.R):

```r
test_that("integer division rounds down", expect_equal(-7 %/% 2, ___))
test_that("several expectations, one description", {
  expect_equal(2 * 3, ___)
  expect_type(2L, ___)
})
```

testthat puts the expected value **second**. Each expectation is a test of its own, described by
the `test_that` around it, or, outside one, by its own code.

| Expectation | Passes when |
|-------------|-------------|
| `expect_equal(object, expected)` | equal, allowing for floating-point error; `1L` equals `1` |
| `expect_identical(object, expected)` | `identical()`: the same type, value and attributes |
| `expect_true`, `expect_false`, `expect_null` | what they say |
| `expect_length(object, n)`, `expect_named(object, names)` | the length, or the names |
| `expect_type(object, type)`, `expect_s3_class(object, class)` | `typeof()`, or a class it inherits |
| `expect_setequal`, `expect_contains` | the same values in any order; includes them |
| `expect_match(object, regexp)` | every string matches |
| `expect_gt`, `expect_gte`, `expect_lt`, `expect_lte` | the comparison holds |
| `expect_error(code, regexp, class)`, `expect_no_error(code)` | running the code signals an error (or not) |
| `expect_warning(code, regexp)`, `expect_message(code, regexp)` | a warning, or a message |
| `expect_output(code, regexp)` | what it prints matches |

Unlike in testthat, a failing expectation prints a TAP line and the koan carries on, so every blank
is checked. Values in "Your answer" and "R says" are written with `deparse`: `c(1, 2)`, `"text"`,
`list(a = 1)`, `1L`.

## How a koan runs

- The worker, [public/runtime/r/worker.js](../../public/runtime/r/worker.js), hosts webR, which
  runs R in a worker of its own. R starts once, in about a second; each run then takes
  milliseconds.
- R isn't restarted between runs: the runner, attached to R's search path, **empties the global
  environment** before each run, and the prelude and the koan define everything in it again.
- R names can't start with `_`, so the runner quotes every `___` in the koan as `` `___` `` before
  parsing it. Lines don't move.
- The koan is parsed with source references, as a file named `koan.R`, and run the way `Rscript`
  runs a file: one top-level expression at a time, printing the visible ones. Each expectation
  finds its line from the source references of the calls that led to it, as `traceback()` does.
- An error the koan doesn't catch is reported with its message and line, and the koan stops. A
  warning is printed and the koan carries on, as in R.
- webR talks to its worker with `postMessage`, which needs no cross-origin isolation headers, so
  the site works on any static host. (Its faster channel needs `SharedArrayBuffer`.)

Node imports the same worker for `check:koans` and `npm test`, with webR's Node build.

## Rules for R blanks

On top of [the rules for every language](../../CONTRIBUTING.md#rules-for-blanks):

- A blank goes on a line that calls an `expect_*` function; `npm run check:koans` rejects one
  anywhere else.
- Put the expected value second, as testthat does: `expect_equal(value, ___)`.
- Give every expectation a `test_that` description; an expectation on its own is described by its
  code.
- Wrap code that warns in `expect_warning` or `suppressWarnings`, unless the warning is the point.

## Files

```
node.mjs            R for the build tools: prelude, lint, running webR under Node
pack.ts             R for the app: wording, look, worker, highlighting, error format
prelude.R           run before every koan: ___, test_that and the expectations
runtime.lock.json   the pinned webR package and the checksums of its files
tap.test.ts         how the app reads webR's real output
koans/              the koans
```

## Interpreter

webR comes from the [`webr`](https://www.npmjs.com/package/webr) npm package, whose dependencies
belong to webR's own demo app, so it isn't installed. `npm run fetch-runtime` downloads its tarball
from the npm registry, checks it against the registry's integrity hash and
[runtime.lock.json](runtime.lock.json), and takes out what R needs into `public/runtime/r/webr/`,
keeping webR's folders:

- R itself (18 MB of WebAssembly), BLAS and LAPACK, and webR's JavaScript (a browser build and a
  Node build): about 21 MB, the largest download of any language here, once.
- A few files webR reads only when R asks for them, such as fonts for plots (about 5 MB). Koans
  don't draw, so learners never download them; the language's `node.mjs` lists them as `onDemand`.

The folder's committed `package.json` tells Node that `webr-worker.js` is CommonJS. To move to a
newer version:

```sh
npm run fetch-runtime -- --lang r --update        # the latest, or: --update 0.7.0
npm run check:koans -- --lang r
npm test
```

A new version may need other files when R starts: run `npm run check:koans -- --lang r`, and add
any file it can't find to the list in `node.mjs`. Under Node, webR runs R in a `worker_threads`
thread, which `node.mjs` holds only while R starts or runs, so the tools can exit.

## Known limitations

- Only the packages that come with R (`base`, `stats`, `utils`, `methods`, `datasets`, …): no CRAN
  packages, so no tidyverse. webR can install packages, but the koans keep to what loads instantly
  and works offline.
- No plots: the koans don't draw.
- A long computation can't be interrupted: the page stops a run that takes too long by restarting
  R, which takes a second.
