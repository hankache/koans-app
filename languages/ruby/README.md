# Ruby

Learn Ruby from its objects to its blocks, through 30 koans. They run on
[ruby.wasm](https://github.com/ruby/ruby.wasm): CRuby 4.0 compiled to WebAssembly. Its path is at
`#/ruby/`.

The koans are new: the original [Ruby Koans](https://www.rubykoans.com/), which inspired this
project, have a license that can't be combined with this one, so nothing here is copied from them.

## The path

| # | Group                | Koans | Covers                                                                 |
|---|----------------------|-------|------------------------------------------------------------------------|
| 1 | Awakening            | 5     | the assertions, truth, `nil`, objects, equality                        |
| 2 | Numbers              | 5     | arithmetic, floats and rationals, conversion, ranges, comparison       |
| 3 | Strings and symbols  | 5     | strings, string methods, slicing, symbols, split, join and format     |
| 4 | Arrays and hashes    | 5     | arrays, `Enumerable`, hashes, hash methods, destructuring and splat    |
| 5 | Methods and blocks   | 5     | methods, blocks, procs and lambdas, closures, enumerators              |
| 6 | Classes and modules  | 5     | classes, inheritance, modules and mixins, `Struct` and `Data`, exceptions |

## The assertions

[Minitest](https://github.com/minitest/minitest)'s, defined by [prelude.rb](prelude.rb), with the
value you expect **first**:

| Assertion                                   | Passes when                                       |
|---------------------------------------------|---------------------------------------------------|
| `assert test, msg` / `refute test, msg`     | `test` is truthy / falsy                          |
| `assert_equal expected, actual, msg`        | `expected == actual`                              |
| `refute_equal unexpected, actual, msg`      | they differ                                       |
| `assert_nil obj, msg`                       | `obj` is `nil`                                    |
| `assert_kind_of cls, obj, msg`              | `obj` is a `cls`, or of a subclass                |
| `assert_instance_of cls, obj, msg`          | `obj` is a `cls`, exactly                         |
| `assert_includes collection, obj, msg`      | `collection.include?(obj)`                        |
| `assert_match matcher, obj, msg`            | the regexp (or string) matches                    |
| `assert_in_delta expected, actual, delta`   | they're within `delta` of each other              |
| `assert_raises(Class, msg) { … }`           | the block raises a `Class`; returns the exception |

Like Raku's `Test` module, a failing assertion prints a TAP line and the koan carries on, so every
blank can be checked. Values in "your answer" and "Ruby says" are written with `inspect`.

## Files

```
node.mjs            Ruby for the build tools: prelude, lint, running ruby.wasm under Node
pack.ts             Ruby for the app: wording, worker, highlighting, error format
prelude.rb          run before every koan: ___ and the assertions
runtime.lock.json   the pinned ruby.wasm package and the checksums of its files
tap.test.ts         how the app reads ruby.wasm's real output
koans/              the koans
```

## How a koan runs

- The worker, [public/runtime/ruby/worker.js](../../public/runtime/ruby/worker.js), gives **every run
  a fresh Ruby**. Ruby keeps classes, constants and methods for as long as it runs, so re-running a
  koan that defines `class Dog < Animal` would otherwise meet the `Dog` from the run before. The
  compiled module is kept, so a fresh Ruby takes a few hundred milliseconds.
- The koan runs at the top level as a file named `koan.rb`; its first line evaluates the prelude.
  Each assertion finds the learner's line with `caller_locations`.
- An error the koan doesn't rescue is reported with its class, message and line. For a syntax
  error, the worker takes Ruby's explanation (`expected an expression after =`) from its
  multi-line message.
- Node imports the same worker for `check:koans` and `npm test`.

## Interpreter

ruby.wasm comes from the [`@ruby/4.0-wasm-wasi`](https://www.npmjs.com/package/@ruby/4.0-wasm-wasi)
npm package. It holds three builds of Ruby (100 MB unpacked), so it isn't installed:
`npm run fetch-runtime` downloads its tarball from the npm registry, checks it against the
registry's integrity hash and [runtime.lock.json](runtime.lock.json), and takes out the two files
it needs: `ruby.wasm` (Ruby without its standard library: 17 MB, 5 MB compressed) and
`browser.umd.js`. To move to a newer version:

```sh
npm run fetch-runtime -- --lang ruby --update          # the latest, or: --update 2.11.0
npm run check:koans -- --lang ruby
npm test
```

## Rules for Ruby blanks

On top of [the rules for every language](../../README.md#rules-for-blanks):

- Put the expected value first, as Minitest does: `assert_equal ___, value`.
- When an answer is a hash, put the arguments in parentheses, in the koan too:
  `assert_equal(___, value)`. Without them, `assert_equal { a: 1 }, value` reads the braces as a
  block.
- No `require`: this Ruby has no standard library. Everything core is there, including `Set`,
  `Struct`, `Data`, `Rational` and `Comparable`. `npm run check:koans` rejects a `require`.
- Don't use the value `assert_raises` returns on a line with a blank: while the blank is unfilled
  there's no exception, and the next line would fail for the wrong reason. Catch it with
  `begin`/`rescue` instead.

## Known limitations

- No standard library, so no `require 'json'`, `'date'` or `'set'` (`Set` is built in).
- No threads, no network, no files beyond memory.
