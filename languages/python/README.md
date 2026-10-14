# Python

Learn Python through 71 koans, from the first `assert` to classes, generators and the standard
library, written the way most Python developers write tests: with [pytest](https://pytest.org)'s
plain `assert` statements. The koans run on [Pyodide](https://pyodide.org): CPython 3.14 compiled
to WebAssembly. Its path is at `#/python/`.

## The path

| #  | Group                      | Koans | Covers                                                                        |
|----|----------------------------|-------|-------------------------------------------------------------------------------|
| 1  | Awakening                  | 6     | asserts, truth, `None` and identity, `pytest.raises`, types, names            |
| 2  | Numbers                    | 7     | arithmetic, division, big ints and floats, conversion, comparison, `math`, fractions and decimals |
| 3  | Strings                    | 8     | f-strings, format specs, slicing, methods, split and join, comparing, escapes, bytes |
| 4  | Lists                      | 7     | lists, slice assignment, list methods, sorting, comprehensions, copies, unpacking |
| 5  | Tuples, dicts and sets     | 6     | tuples, dicts, dict methods and comprehensions, sets, `collections`           |
| 6  | Control flow               | 5     | `if`, `for`, `while` and loop `else`, `match`, the walrus                     |
| 7  | Functions                  | 9     | defaults, `*args`/`**kwargs`, keyword- and positional-only, lambdas, closures, scope, decorators, recursion |
| 8  | Iterators and generators   | 5     | the iterator protocol, generators, generator expressions, `itertools`, built-ins |
| 9  | Classes                    | 8     | classes, attributes, properties, special methods, inheritance, class and static methods, dataclasses, ABCs |
| 10 | Exceptions                 | 4     | `try`/`except`/`else`/`finally`, raising, chaining, context managers          |
| 11 | The standard library       | 6     | `functools`, `operator`, `datetime`, `json`, `re`, `enum`                     |

## How the tests are written

The pytest way:

```python
assert -7 // 2 == ___, 'floor division rounds down'

with pytest.raises(ZeroDivisionError):  # dividing by zero
    1 / 0
```

- `assert test, message`: the message describes the test. A failed `==` shows both sides
  ("expected" is the right-hand side, "got" the left); other comparisons say what was false.
- `with pytest.raises(Error):`, optionally with `match=` for the message. The comment on the `with`
  line describes the test.
- `pytest.approx(x)` compares floats within a tolerance.

## How a koan runs

pytest rewrites `assert` statements before running a test file, so that a failure can say what each
side was. The runner here does the same, in
[public/runtime/python/worker.js](../../public/runtime/python/worker.js):

1. It parses the koan with Python's `ast` module and rewrites each `assert` into a call to a helper
   from [prelude.py](prelude.py), which prints TAP and lets the koan carry on, so every blank is
   checked. An assert that still holds a blank, anywhere in it, fails without running. Each
   `pytest.raises` gets its line and description. Line numbers stay exactly as written.
2. It runs the rewritten koan as the file `<exec>`, in fresh globals, so nothing leaks between runs.
3. An error the koan doesn't catch is printed as a traceback; its first `<exec>` frame is the koan's
   line, and its last line the message.

The prelude, on the koan's first line, defines `___`, the helpers and a small `pytest` with
`raises` and `approx`. Node imports the same worker for `check:koans` and `npm test`.

## Files

```
node.mjs            Python for the build tools: prelude, lint, running Pyodide under Node
pack.ts             Python for the app: wording, worker, highlighting, traceback formats
prelude.py          run before every koan: ___, the assert helpers, pytest.raises and approx
runtime.lock.json   the pinned Pyodide version and the checksums of its files
tap.test.ts         how the app reads the runner's real output
koans/              the koans
```

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

## Rules for Python blanks

These replace the general rule that a blank must be an assertion's argument:

- A blank goes in an `assert`, anywhere in it, or in a `with pytest.raises(…)` line.
  `npm run check:koans` rejects one anywhere else.
- Give each `assert` a message, and each `with pytest.raises` a comment: they're what the learner
  sees next to the result.
- Keep an assert that holds a blank on one line: the test is reported on its first line.

## Known limitations

- Pyodide runs in the browser: no network access from Python, no threads, and `input()` has
  nothing to read.
- Packages beyond the standard library (installed with `micropip`) aren't loaded.
- The interpreter is about 13 MB, downloaded once and then cached by the browser.
