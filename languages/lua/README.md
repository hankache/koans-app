# Lua

Learn Lua from its tables to its metatables, through 30 koans. They run on
[wasmoon](https://github.com/ceifa/wasmoon): Lua 5.4 compiled to WebAssembly, under half a
megabyte. Its path is at `#/lua/`.

## The path

| # | Group                  | Koans | Covers                                                               |
|---|------------------------|-------|----------------------------------------------------------------------|
| 1 | Awakening              | 5     | the assertions, truthiness, types, equality, errors and `pcall`      |
| 2 | Numbers                | 5     | `/` and `//`, integers and floats, conversion, `math`, formatting    |
| 3 | Strings                | 5     | strings, string methods, patterns, splitting and joining, UTF-8      |
| 4 | Tables                 | 5     | arrays, dictionaries, iteration, table functions, references         |
| 5 | Functions              | 5     | multiple results, varargs, closures, higher-order functions, methods |
| 6 | Metatables and objects | 5     | metatables, operators, classes, inheritance, coroutines              |

## The assertions

[busted](https://lunarmodules.github.io/busted/)'s, defined by [prelude.lua](prelude.lua), with the
value you expect **first**:

| Assertion                                         | Passes when                                    |
|---------------------------------------------------|------------------------------------------------|
| `assert(v, msg)`, `assert.truthy` / `falsy`       | `v` counts as true / false                     |
| `assert.are.equal(expected, actual, msg)`         | `expected == actual`                           |
| `assert.are_not.equal(unexpected, actual, msg)`   | they differ                                    |
| `assert.are.same(expected, actual, msg)`          | the tables have the same contents, all the way down |
| `assert.is_true` / `is_false` / `is_nil(v, msg)`  | `v` is `true`, `false` or `nil`, exactly       |
| `assert.has_error(fn, msg)`                       | calling `fn` raises an error                   |
| `assert.error_matches(fn, pattern, msg)`          | it raises one whose message matches the pattern |

Like Raku's `Test` module, a failing assertion prints a TAP line and the koan carries on, so every
blank can be checked. Tables in "your answer" and "Lua says" are written the way you'd write them:
`{1, 2, x = "a"}`.

## Files

```
node.mjs            Lua for the build tools: prelude, running wasmoon under Node
pack.ts             Lua for the app: wording, worker, highlighting, error format
prelude.lua         run before every koan: ___ and the assertions
runtime.lock.json   the pinned wasmoon version and the checksums of its files
tap.test.ts         how the app reads wasmoon's real output
koans/              the koans
```

## How a koan runs

- The worker, [public/runtime/lua/worker.js](../../public/runtime/lua/worker.js), gives every run a
  **fresh Lua state** (a millisecond or two), so globals a koan sets can't leak into the next run.
- The koan is loaded as a chunk named `koan.lua`; its first line is the prelude, folded onto one
  line (Lua needs no newlines between statements). Each assertion finds the learner's line with
  `debug.getinfo`: the first frame in `koan.lua` below line 1.
- An error the koan doesn't catch is reported with Lua's message and its line, and a syntax error
  as `syntax error: …`.
- An assertion whose message isn't a string fails with an explanation. That's what happens when a
  function with several results ends the argument list, as in `assert.are.equal(7, s:find('x'))`:
  Lua passes all of them on, and the second becomes the message.
- Node imports the same worker for `check:koans` and `npm test`.

## Interpreter

wasmoon comes from the [`wasmoon`](https://www.npmjs.com/package/wasmoon) npm package, downloaded
from the registry rather than installed (it would bring dependencies of its own), and checked
against the registry's integrity hash and [runtime.lock.json](runtime.lock.json). To move to a
newer version:

```sh
npm run fetch-runtime -- --lang lua --update        # the latest, or: --update 1.17.0
npm run check:koans -- --lang lua
npm test
```

## Rules for Lua blanks

On top of [the rules for every language](../../README.md#rules-for-blanks):

- Put the expected value first, as busted does: `assert.are.equal(___, value)`.
- A call with several results as the **last** argument passes all of them on. Give the assertion a
  message, or wrap the call in parentheses to keep only its first result.
- The prelude is folded onto one line: it must never have a `--` comment at the end of a code line.

## Known limitations

- No `require` of other files, no `io.open` beyond memory, no `os.execute`.
