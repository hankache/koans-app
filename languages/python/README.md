# Python

Learn Python from the first `assert` to classes, generators and the standard library, through 86
koans written the way most Python is tested: with [pytest](https://pytest.org)'s plain `assert`
statements. They run on [Pyodide](https://pyodide.org): CPython 3.14, compiled to WebAssembly.

**Try it:** [koans.app/python/](https://koans.app/python/)

## The path

| #  | Group                    | Koans | Covers |
|---:|--------------------------|------:|--------|
| 1  | Awakening                | 6     | asserts, truth, `None` and identity, `pytest.raises`, types, names |
| 2  | Numbers                  | 7     | arithmetic, division, big ints and floats, conversion, comparison, `math`, fractions and decimals |
| 3  | Strings                  | 8     | f-strings, format specs, slicing, methods, split and join, comparing, escapes, bytes |
| 4  | Lists                    | 7     | lists, slice assignment, list methods, sorting, comprehensions, copies, unpacking |
| 5  | Tuples, dicts and sets   | 6     | tuples, dicts, dict methods and comprehensions, sets, `collections` |
| 6  | Control flow             | 5     | `if`, `for`, `while` and loop `else`, `match`, the walrus operator |
| 7  | Functions                | 9     | defaults, `*args` and `**kwargs`, keyword- and positional-only parameters, lambdas, closures, scope, decorators, recursion |
| 8  | Iterators and generators | 5     | the iterator protocol, generators, generator expressions, `itertools`, built-ins |
| 9  | Classes                  | 11    | classes, attributes, properties, special methods, inheritance, class and static methods, dataclasses, ABCs, `__slots__`, descriptors, `__init_subclass__` and metaclasses |
| 10 | Exceptions               | 5     | `try`/`except`/`else`/`finally`, raising, chaining, context managers, exception groups and `except*` |
| 11 | The standard library     | 8     | `functools`, `operator`, `datetime`, `json`, `re`, `enum`, `heapq` and `bisect`, `statistics` and `random` |
| 12 | Type hints               | 4     | annotations, unions and `Optional`, `Protocol` and `TypedDict`, generics and `type` aliases |
| 13 | Puzzles                  | 5     | FizzBuzz, word frequencies, anagrams, run-length encoding, the sieve of Eratosthenes |

## How the tests are written

The pytest way:

```python
assert -7 // 2 == ___, 'floor division rounds down'

with pytest.raises(ZeroDivisionError):  # dividing by zero
    1 / 0
```

- `assert test, message`: the message describes the test. A failed `==` shows both sides (the
  right-hand side is "expected", the left "got"); other comparisons say what was false.
- `with pytest.raises(Error):`, optionally with `match=` for the message. The comment on the `with`
  line describes the test.
- `pytest.approx(x)` compares floats within a tolerance.

## How a koan runs

pytest rewrites `assert` statements before running a test file, so that a failure can show each
side. The runner does the same, in
[public/runtime/python/worker.js](../../public/runtime/python/worker.js):

1. It parses the koan with Python's `ast` module and rewrites each `assert` into a call to a helper
   from [prelude.py](prelude.py), which prints TAP and lets the koan carry on, so every blank is
   checked. An `assert` that still holds a blank, anywhere in it, fails without running. Each
   `pytest.raises` gets its line and description. Line numbers stay exactly as written.
2. It runs the rewritten koan as the file `<exec>`, in fresh globals, so nothing leaks between runs.
3. An error the koan doesn't catch is printed as a traceback: its first `<exec>` frame gives the
   koan's line, and its last line the message.

The prelude, on the koan's first line, defines `___`, the helpers and a small `pytest` with
`raises` and `approx`. Node imports the same worker for `check:koans` and `npm test`.

## Rules for Python blanks

These replace the general rule that a blank must be an assertion's argument:

- A blank goes in an `assert`, anywhere in it, or on a `with pytest.raises(…)` line.
  `npm run check:koans` rejects one anywhere else.
- Give each `assert` a message, and each `with pytest.raises` a comment: they're what the learner
  sees beside the result.
- Keep an `assert` that holds a blank on one line: the test is reported on its first line.

## Files

```
node.mjs            Python for the build tools: prelude, lint, running Pyodide under Node
pack.ts             Python for the app: wording, look, worker, highlighting, traceback formats
prelude.py          run before every koan: ___, the assert helpers, pytest.raises and approx
runtime.lock.json   the pinned Pyodide version and the checksums of its files
tap.test.ts         how the app reads the runner's real output
koans/              the koans
```

## Interpreter

Pyodide comes from the [`pyodide`](https://www.npmjs.com/package/pyodide) npm package, pinned by
`package-lock.json`. `npm run fetch-runtime` copies the files it needs into
`public/runtime/python/` and checks them against [runtime.lock.json](runtime.lock.json). To move
to a newer version:

```sh
npm install --save-dev pyodide@<version>
npm run fetch-runtime -- --lang python --update
npm run check:koans -- --lang python
npm test
```

## Known limitations

- No network access from Python, no threads, and `input()` has nothing to read.
- Only the standard library: packages installed with `micropip` aren't loaded.
- The interpreter is about 13.5 MB (around 6 MB compressed), downloaded once and then saved for
  offline use.
