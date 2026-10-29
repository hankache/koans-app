# Go

Learn Go from its zero values to its goroutines, through 73 koans written the way Go is tested:
`func TestXxx(t *testing.T)`, with [testify](https://github.com/stretchr/testify)'s `assert`.
They run on Go's own compiler and linker, the official Go 1.27 release built for WebAssembly:
each run compiles the koan, links it and runs the program, in the browser. The toolchain and
standard library are about 20 MB compressed.

**Try it:** [koans.app/go/](https://koans.app/go/)

## The path

| #  | Group                     | Koans | Covers |
|---:|---------------------------|------:|--------|
| 1  | Awakening                 | 4     | `assert`, variables and zero values, constants and `iota`, conversions |
| 2  | Numbers                   | 4     | `/` and `%`, floats and `math`, sized integers, `strconv` |
| 3  | Strings                   | 5     | strings as bytes, the `strings` package, runes and UTF-8, `fmt` verbs, `strings.Builder` |
| 4  | Control flow              | 4     | `if` with a short statement, `for` in its three forms, `switch`, labels |
| 5  | Functions                 | 4     | several results, named results and variadic functions, closures, recursion |
| 6  | Arrays and slices         | 5     | arrays, slices, slicing, `append` and `copy`, the `slices` package |
| 7  | Maps                      | 4     | maps, going through them in order, sets and struct keys, maps shared by reference |
| 8  | Structs                   | 4     | structs, pointers, copies, embedding |
| 9  | Methods and interfaces    | 6     | methods, pointer receivers, interfaces, `fmt.Stringer`, type assertions and switches, nil interfaces |
| 10 | Errors                    | 4     | errors as values, wrapping with `%w`, `errors.Is` and `errors.As`, `errors.Join` |
| 11 | Defer, panic and recover  | 2     | `defer`, `panic` and `recover` |
| 12 | Generics                  | 4     | generic functions, constraints, generic types, `comparable` |
| 13 | Iterators                 | 3     | ranging over functions, `iter.Seq`, lazy sequences |
| 14 | Goroutines and channels   | 6     | goroutines and `sync`, channels, buffered channels, `select`, pipelines, `context` |
| 15 | The standard library      | 5     | sorting, `time`, `encoding/json`, `regexp`, `bufio` and `io` |
| 16 | Testing                   | 3     | table-driven tests and subtests, assertions and `require`, helpers and cleanup |
| 17 | Puzzles                   | 6     | loop variables, shadowing, shared arrays, deferred results, method sets, map values |

## How the tests are written

```go
package koans

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestStrings(t *testing.T) {
	assert.Equal(t, ___, strings.ToUpper("go"), "ToUpper")
	assert.Len(t, []int{1, 2}, ___, "len")
}
```

A koan is a whole Go test file: its package clause, its imports, and `Test` functions that take
`*testing.T`. `testing`, `github.com/stretchr/testify/assert` and `.../require` are the koans' own
packages ([public/runtime/go/support/](../../public/runtime/go/support/)), with the same API as
Go's and testify's:

- **testing** has `T` with `Error`, `Errorf`, `Fatal`, `Fatalf`, `Fail`, `FailNow`, `Run`,
  `Helper`, `Cleanup`, `Skip`, `Log` and `Name`, and the `TB` interface. Each check reports itself
  as a TAP line, with the koan's line on a failure, found on the stack (past functions that called
  `t.Helper()`). Tests run in order, each in its goroutine, as `go test` runs them; a test that
  checks nothing reports itself, passed or failed.
- **assert** has testify's assertions: `Equal`, `NotEqual`, `EqualValues`, `Exactly`, `True`,
  `False`, `Nil`, `NotNil`, `Zero`, `Empty`, `Len`, `Contains`, `ElementsMatch`, `Greater` and
  `Less` and their `OrEqual` forms, `InDelta`, `IsType`, `Same`, `Regexp`, `NoError`, `Error`,
  `EqualError`, `ErrorContains`, `ErrorIs`, `ErrorAs`, `Panics`, `PanicsWithValue`,
  `PanicsWithError` and `Fail`. Each takes `any` wherever an answer goes, so a `___` fails its
  check whatever the answer's type, and the koan carries on.
- **require** has the most used of them; a failure ends the test, as testify's does.

One difference from testify: `Equal` compares an untyped constant's default type (`int`,
`float64`, `rune`, `string`, `bool`) the way Go compares the constant, so `assert.Equal(t, 3, x)`
passes for a `float64` or `int64` x of 3, and `'e'` equals the byte `s[1]`. Without it, a learner
who writes `3` for `3.0` would be told that `3` isn't `3`. Values in "Your answer" and "Go says"
are written as Go code (`%#v`), with their types when the types differ: `3 (int)`.

## How a koan runs

- The worker, [public/runtime/go/worker.js](../../public/runtime/go/worker.js), loads Go's
  compiler and linker (WebAssembly for `wasip1`) and the standard library's compiled packages into
  a file system in memory, served by [wasi.js](../../public/runtime/go/wasi.js), a small WASI of
  our own. At start, it compiles the koans' `testing`, `assert` and `require`, which also warms
  the compiler up.
- Each run writes the koan as `koan_test.go`, its package clause changed to `package main` in
  place, beside a `koan_main.go` of our own that declares `___` and a `main` that runs the koan's
  `Test` functions. It compiles both, links them and runs the program, a fresh one every time.
  That takes about half a second.
- The compiler's errors and a panic's trace name `koan_test.go:N`, which the app reads as the
  line. A panic stops the koan, as it stops `go test`; `debug.SetMaxStack` stops runaway
  recursion at 64 MB.
- The prelude is one comment line before the package clause, so the koan's line numbers shift by
  exactly one.

Node imports the same worker and WASI for `check:koans` and `npm test`.

## Rules for Go blanks

On top of [the rules for every language](../../CONTRIBUTING.md#rules-for-blanks):

- A blank is an argument of an `assert` or `require` call, on that call's line; `npm run
  check:koans` rejects one anywhere else. Anywhere else, `___` wouldn't compile.
- A koan imports exactly what it uses: Go refuses an unused import.
- No test may panic: a panic ends the program, and the blanks after it would never be checked.
  Check panics with `assert.Panics`, `PanicsWithValue` or `PanicsWithError`.

## Files

```
node.mjs            Go for the build tools: prelude, lint, building the toolchain, running it under Node
pack.ts             Go for the app: wording, look, worker, highlighting, error format
runtime.lock.json   the pinned Go release and the checksums of the files built from it
tap.test.ts         how the app reads the real output of a koan's run
koans/              the koans
```

## Interpreter

There isn't one: koans are compiled. `npm run fetch-runtime` downloads the official Go release for
the computer it runs on from [go.dev](https://go.dev/dl/), checks it against the checksum go.dev
publishes, and builds with it, for `GOOS=wasip1 GOARCH=wasm`: `cmd/compile` (split into parts
under Cloudflare's 25 MB limit per file), `cmd/link`, and the standard library packages listed in
[node.mjs](node.mjs) with all they depend on. The builds are reproducible, so each file is checked
against its checksum in [runtime.lock.json](runtime.lock.json). The Go release is kept in
`node_modules/.cache/koans-go`. To move to a newer release:

```sh
npm run fetch-runtime -- --lang go --update        # the latest release, or: --update go1.27.3
npm run check:koans -- --lang go
npm test
```

## Known limitations

- **The standard library** has the packages listed in [node.mjs](node.mjs): `fmt`, `strings`,
  `strconv`, `slices`, `maps`, `errors`, `sort`, `time`, `sync`, `context`, `encoding/json`,
  `regexp`, `bufio` and the rest of what koans use. Importing another is a compile error.
- **No network, files or real time:** programs run in a WebAssembly sandbox, with an empty file
  system. `time.Sleep` works, by waiting.
- **One thread:** goroutines run one at a time, as with `GOMAXPROCS=1`, so a data race can't
  show itself.
- **testing and testify are the koans' own:** benchmarks, fuzzing, `t.Parallel` (which does
  nothing) and testify's `suite` and `mock` aren't there.
