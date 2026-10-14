# Python

Learn Python from the first assertion to its built-in collections, through 20 koans. The koans
run on [Pyodide](https://pyodide.org): CPython 3.14 compiled to WebAssembly.

Its path is at `#/python/` (`http://localhost:5173/#/python/` in development).

## The path

| # | Group                         | Koans | Covers                                                        |
|---|-------------------------------|-------|---------------------------------------------------------------|
| 1 | Awakening                     | 5     | the assertions, truth, `None` and identity, exceptions, types |
| 2 | Numbers                       | 5     | arithmetic, division, big integers and floats, conversion, comparison |
| 3 | Strings                       | 5     | quoting and f-strings, slicing, methods, split and join, comparing |
| 4 | Lists, tuples, dicts and sets | 5     | lists, comprehensions, unpacking, dictionaries, sets          |

## The assertions

The koans use plain functions named after `unittest`'s methods (`assertEqual` → `assert_equal`),
defined by [prelude.py](prelude.py):

| Assertion                                   | Passes when                                      |
|---------------------------------------------|--------------------------------------------------|
| `assert_true(value, msg)`                   | `value` is truthy                                |
| `assert_false(value, msg)`                  | `value` is falsy                                 |
| `assert_equal(actual, expected, msg)`       | `actual == expected`                             |
| `assert_not_equal(actual, unexpected, msg)` | `actual != unexpected`                           |
| `assert_is(actual, expected, msg)`          | `actual is expected`: the very same object       |
| `assert_is_instance(value, cls, msg)`       | `isinstance(value, cls)`                         |
| `assert_in(member, container, msg)`         | `member in container`                            |
| `assert_raises(exception, function, msg)`   | calling `function()` raises `exception`          |

Unlike a plain `assert`, a failing assertion doesn't stop the koan: like Raku's `Test` module, each
one prints a TAP line and the koan carries on, so every blank can be checked.

## Files

```
node.mjs            Python for the build tools: prelude, lint, running Pyodide under Node
pack.ts             Python for the app: wording, worker, highlighting, traceback formats
prelude.py          run before every koan: ___ and the assertions
runtime.lock.json   the pinned Pyodide version and the checksums of its files
tap.test.ts         how the app reads Pyodide's real output
koans/              the koans
```

The worker that runs Pyodide in the browser is
[public/runtime/python/worker.js](../../public/runtime/python/worker.js), a module worker. Each run
gets fresh globals, so nothing a koan defines leaks into the next run.

## How the prelude works

Python can't be folded onto one line the way Raku's prelude is, so the build wraps all of
[prelude.py](prelude.py) in one `exec("…")` on the first line. The koan's line numbers shift by
exactly one, and it runs at the top level of the same module, where `___` and the assertions are
defined.

Each assertion finds the learner's line by walking up the call stack to the first frame that isn't
the prelude's (`exec` gives the prelude the file name `<string>`; the koan is `<exec>`). A failure
inside a function the koan defines reports the line in that function.

## Rules for Python blanks

On top of [the rules for every language](../../README.md#rules-for-blanks):

- Use the assertions, never a plain `assert`: it stops the koan at its first failure, so later
  blanks could never be checked. `npm run check:koans` rejects it.
- Keep a blank on the first line of its assertion call.

## Interpreter

Pyodide comes from the [`pyodide` npm package](https://www.npmjs.com/package/pyodide), pinned by
`package-lock.json`; `npm run fetch-runtime` copies the files it needs into `public/runtime/python/`
and checks them against [runtime.lock.json](runtime.lock.json). To move to a newer version:

```sh
npm install --save-dev pyodide@<version>
npm run fetch-runtime -- --lang python --update
npm run check:koans -- --lang python
npm test
```

## Known limitations

- Pyodide runs in the browser: no network access from Python, no threads, and `input()` has
  nothing to read.
- Packages beyond the standard library (installed with `micropip`) aren't loaded.
- The interpreter is about 13 MB, downloaded once and then cached by the browser.
