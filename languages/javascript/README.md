# JavaScript

Learn modern JavaScript from its values to async functions, through 30 koans. They run on the
browser's own JavaScript engine, so there's no interpreter to download. Its path is at
`#/javascript/`.

## The path

| # | Group                        | Koans | Covers                                                              |
|---|------------------------------|-------|---------------------------------------------------------------------|
| 1 | Awakening                    | 5     | the assertions, `==` and `===`, `typeof`, truthiness, errors        |
| 2 | Numbers                      | 5     | arithmetic, floating point, `NaN` and `Infinity`, conversion, `Math` and `BigInt` |
| 3 | Strings                      | 5     | template literals, slicing, methods, split and join, comparing      |
| 4 | Arrays                       | 5     | arrays, `slice` and `splice`, `map`/`filter`/`reduce`, searching, sorting |
| 5 | Objects, Maps and Sets       | 5     | objects, destructuring, spread and copies, `Map`, `Set`             |
| 6 | Functions, classes and async | 5     | functions, arrow functions, closures, classes, promises and `await` |

## The assertions

The koans use the API of Node's [`assert` module](https://nodejs.org/api/assert.html), in its
strict flavour, implemented in the worker:

| Assertion                                         | Passes when                                                |
|---------------------------------------------------|------------------------------------------------------------|
| `assert.ok(value, msg)`, or `assert(value, msg)`  | `value` is truthy                                          |
| `assert.equal(actual, expected, msg)`             | `Object.is(actual, expected)`: `===`, but `NaN` equals `NaN` |
| `assert.notEqual(actual, unexpected, msg)`        | they differ                                                |
| `assert.deepEqual(actual, expected, msg)`         | same structure and prototypes, all the way down            |
| `assert.notDeepEqual(actual, unexpected, msg)`    | they differ somewhere                                      |
| `assert.match(string, regexp, msg)`               | `regexp` matches `string`                                  |
| `assert.throws(fn, expected, msg)`                | calling `fn()` throws: an instance of the class `expected`, or an error whose message matches the regexp `expected` |
| `await assert.rejects(promise, expected, msg)`    | the promise (or the function's promise) rejects, likewise  |

Like Raku's `Test` module, a failing assertion prints a TAP line and the koan carries on, so every
blank can be checked. Values in "your answer" and "JavaScript says" are written the way Node's
console writes them: `'text'`, `[1, 2]`, `{ a: 1 }`, `Map(1) { 'k' => 1 }`.

## Files

```
node.mjs            JavaScript for the build tools: prelude, lint, running koans under Node
pack.ts             JavaScript for the app: wording, worker, highlighting, error format
prelude.js          run before every koan (one line)
runtime.lock.json   the pinned Acorn version and the checksum of its file
tap.test.ts         how the app reads the worker's real output
koans/              the koans
```

The worker, [public/runtime/javascript/worker.js](../../public/runtime/javascript/worker.js), holds
the assertions and runs the koans. Node imports the same file for `check:koans` and `npm test`, so
CI checks koans with the code the browser runs (on V8, as in Chrome; Firefox's engine is checked
by the browser tests).

## How a koan runs

- The worker runs prelude + koan + epilogue with indirect `eval`, as a strict-mode script named
  `koan.js` (a `//# sourceURL` comment), so stack traces carry the koan's line numbers.
- The prelude, on line 1, takes `___` and `assert` from the worker and opens an `async` function,
  so koans can use `await` at the top; the epilogue closes it and the worker waits for it.
- Each assertion finds the learner's line in its own stack trace: the first `koan.js` frame below
  line 1. That works inside the koan's own functions and after `await`.
- Strict mode means assigning to an undeclared name is an error, and the koan's variables don't
  leak into the next run.
- Browsers don't say where a syntax error is in `eval`'d code, so on a `SyntaxError` the worker
  loads the [Acorn](https://github.com/acornjs/acorn) parser (`acorn.mjs`, about 230 KB, only then)
  to find its line.

## Rules for JavaScript blanks

On top of [the rules for every language](../../README.md#rules-for-blanks):

- Use the assertions, never `console.assert`: it prints and carries on without a test result, so a
  blank in it is never checked. `npm run check:koans` rejects it.
- Put the blank directly as an argument: `assert.ok(!___)` is an expression, not a blank the
  assertions can see.
- Await `assert.rejects`, or its result arrives after the koan has finished.

## Known limitations

- Changes to built-in objects (like adding to `Array.prototype`) last until the page is reloaded:
  every run shares the worker's globals. Variables don't.
- No modules: koans can't `import`.
