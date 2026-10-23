# JavaScript

Learn modern JavaScript from its values to async functions, through 89 koans written the way most
JavaScript is tested: with [Vitest](https://vitest.dev)'s `expect`, the same API as Jest's. They
run on the browser's own JavaScript engine, so there's no interpreter to download.

**Try it:** [koans.app/javascript/](https://koans.app/javascript/)

## The path

| #  | Group                    | Koans | Covers |
|---:|--------------------------|------:|--------|
| 1  | Awakening                | 6     | `expect`, `==` and `===`, `typeof`, truthiness, `null` and `undefined`, errors |
| 2  | Numbers                  | 7     | arithmetic, floating point, `NaN` and `Infinity`, conversion, `Math`, `BigInt`, typed arrays |
| 3  | Strings                  | 7     | template literals, slicing, methods, split, join and pad, comparing, Unicode, regular expressions |
| 4  | Variables and scope      | 4     | `let` and `const`, block scope, hoisting, destructuring |
| 5  | Control flow             | 6     | `if` and the ternary, `switch`, loops, `for…in`, labeled `break` and `continue`, `&&`, `\|\|`, `??` and their assignments |
| 6  | Arrays                   | 9     | arrays, `slice` and `splice`, `map`/`filter`/`reduce`, searching, sorting, copies, iterating, building, grouping |
| 7  | Objects                  | 7     | objects, shorthand and computed keys, spread and rest, `Object.*`, getters and setters, freezing, `?.` and `??` |
| 8  | Maps, sets and symbols   | 5     | `Map`, `Set`, set operations, `Symbol`, `WeakMap`, `WeakSet` and `WeakRef` |
| 9  | Functions                | 7     | declarations, arrows, parameters, closures, higher-order functions, `this`, recursion |
| 10 | Classes and prototypes   | 6     | classes, inheritance, private and static members, accessors, prototypes, mixins |
| 11 | Iterators and generators | 6     | the iteration protocol, generators, `yield*`, custom iterables, iterator helpers, `for await` |
| 12 | Async                    | 5     | promises, `async`/`await`, combinators, async errors, the event loop |
| 13 | Errors                   | 3     | `try`/`catch`/`finally`, custom errors, causes |
| 14 | JSON, dates and Intl     | 3     | `JSON`, `Date`, `Intl` |
| 15 | Metaprogramming          | 3     | `Proxy`, `Reflect`, tagged templates |
| 16 | Puzzles                  | 5     | FizzBuzz, word count, run-length encoding, Roman numerals, matrices |

## How the tests are written

```js
expect('5' + 2, 'with a string, + joins').toBe(___);
expect(() => null.x, 'null has no properties').toThrow(___);
await expect(fetchLater(), 'it resolves').resolves.toEqual(___);
```

`expect(value, message)` takes the description as its second argument, as in Vitest. The worker
implements the matchers the koans use:

| Matcher | Passes when |
|---------|-------------|
| `toBe(x)` | `Object.is(value, x)`: `===`, except that `NaN` equals `NaN` |
| `toEqual(x)`, `toStrictEqual(x)` | the contents match all the way down; the strict one also wants the same classes and no extra `undefined` properties |
| `toBeTruthy()`, `toBeFalsy()`, `toBeNull()`, `toBeUndefined()`, `toBeDefined()`, `toBeNaN()` | what they say |
| `toBeGreaterThan(x)` and the like, `toBeCloseTo(x, digits)` | the numbers compare, or agree to `digits` decimals (2 by default) |
| `toContain(x)`, `toContainEqual(x)`, `toHaveLength(n)` | an array or string holds `x`, or has length `n` |
| `toHaveProperty(path, value?)`, `toMatchObject(x)` | an object has a property, or at least the properties of `x` |
| `toMatch(regexp or string)`, `toBeInstanceOf(Class)` | what they say |
| `toThrow(Class, string or regexp)` | calling the function throws such an error |
| `.not`, `.resolves`, `.rejects` | turn the expectation around, or apply it to what a promise resolves or rejects to (`await` them) |

Unlike in Vitest, a failing expectation prints a TAP line and the koan carries on, so every blank
is checked. Values in "Your answer" and "JavaScript says" are written as Node's console writes
them: `'text'`, `[1, 2]`, `{ a: 1 }`, `Map(1) { 'k' => 1 }`.

## How a koan runs

The worker, [public/runtime/javascript/worker.js](../../public/runtime/javascript/worker.js),
holds `expect` and runs the koans:

- It runs prelude, koan and epilogue with indirect `eval`, as a strict-mode script named `koan.js`
  (through a `//# sourceURL` comment), so stack traces carry the koan's line numbers.
- The prelude, on line 1, takes `___` and `expect` from the worker and opens an `async` function,
  so koans can use `await` at the top level; the epilogue closes it, and the worker waits for it.
- Each expectation finds the learner's line in its own stack trace: the first `koan.js` frame below
  line 1. That works inside the koan's own functions and after `await`.
- Strict mode makes assigning to an undeclared name an error, and keeps the koan's variables from
  leaking into the next run.
- Browsers don't say where a syntax error is in `eval`'d code, so on a `SyntaxError` the worker
  loads the [Acorn](https://github.com/acornjs/acorn) parser (`acorn.mjs`, about 230 KB, fetched
  only then) to find its line.

Node imports the same worker for `check:koans` and `npm test`, so CI checks the koans with the code
the browser runs: on V8, as in Chrome, while the browser tests cover Firefox's engine.

## Rules for JavaScript blanks

On top of [the rules for every language](../../CONTRIBUTING.md#rules-for-blanks):

- A blank goes on a line with an `expect(…)`, as a value: inside `expect(…)` or as a matcher's
  argument, never as a matcher's name. `npm run check:koans` rejects one anywhere else.
- Keep each expectation on one line: it's reported on its matcher's line.
- Give each `expect` a message: it's what the learner sees beside the result.
- Await `.resolves` and `.rejects`, or their result arrives after the koan has finished.

## Files

```
node.mjs            JavaScript for the build tools: prelude, lint, running koans under Node
pack.ts             JavaScript for the app: wording, look, worker, highlighting, error format
prelude.js          run before every koan (one line)
runtime.lock.json   the pinned Acorn version and the checksum of its file
tap.test.ts         how the app reads the worker's real output
koans/              the koans
```

## Interpreter

None: the koans run on the browser's own engine. The only file fetched is the Acorn parser, from
the [`acorn`](https://www.npmjs.com/package/acorn) npm package, pinned by `package-lock.json` and
checked against [runtime.lock.json](runtime.lock.json).

## Known limitations

- Changes to built-in objects (such as adding to `Array.prototype`) last until the page is
  reloaded: every run shares the worker's globals. Variables don't.
- No modules: koans can't `import`.
