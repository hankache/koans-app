# PHP

Learn modern PHP from its arrays to its enums, through 79 koans written with the assertions of
[PHPUnit](https://phpunit.de), the test framework most PHP projects use. They run on
[php-wasm](https://github.com/seanmorris/php-wasm): PHP 8.5 compiled to WebAssembly. Its path is
at `#/php/`.

## The path

| #  | Group                  | Koans | Covers                                                                |
|----|------------------------|-------|-----------------------------------------------------------------------|
| 1  | Awakening              | 6     | the assertions, truthiness, `null`, types, `==` and `===`, errors      |
| 2  | Numbers                | 6     | arithmetic, ints and floats, conversion, math functions, formatting, random numbers |
| 3  | Strings                | 8     | quotes and interpolation, heredoc and nowdoc, string functions, searching, splitting and replacing, `sprintf`, bytes and characters, regular expressions |
| 4  | Arrays                 | 9     | lists, associative arrays, adding and removing, searching, map/filter/reduce, sorting, slicing and merging, destructuring, more array functions |
| 5  | Control flow           | 5     | conditions, `??` and `??=`, `match`, `switch`, loops                   |
| 6  | Functions              | 10    | types, defaults and nullable types, named arguments, variadics, references, closures, callables, the pipe operator, recursion, static variables |
| 7  | Classes                | 10    | classes and objects, constructors and `readonly`, visibility, static members, inheritance, abstract classes and interfaces, traits, magic methods, property hooks, `static::` |
| 8  | Enums and types        | 7     | enums, backed enums, `?->`, built-in interfaces, comparing objects, attributes, type juggling |
| 9  | Generators and fibers  | 5     | generators, keys and `yield from`, `send`, lazy pipelines, fibers      |
| 10 | Errors                 | 3     | `try`/`catch`/`finally`, the `Throwable` hierarchy, custom exceptions  |
| 11 | The standard library   | 5     | JSON, dates, SPL data structures, `bcmath`, `WeakMap` and `WeakReference` |
| 12 | Puzzles                | 5     | FizzBuzz, word frequencies, anagrams, run-length encoding, Roman numerals |

The koans teach PHP as it is now, 8.4 and 8.5 included: property hooks, asymmetric visibility,
`array_find`, `array_first`, `clone` with new values and the pipe operator, `|>`.

## The assertions

PHPUnit's, as the global functions PHPUnit also provides, defined by [prelude.php](prelude.php),
with the value you expect **first** and the description last:

```php
assertSame(___, intdiv(7, 2), 'intdiv drops the fraction');
```

| Assertion                                                 | Passes when                                  |
|-----------------------------------------------------------|----------------------------------------------|
| `assertSame($expected, $actual)`, `assertNotSame`         | `===`: the same type and value               |
| `assertEquals($expected, $actual)`, `assertNotEquals`     | `==`                                         |
| `assertEqualsWithDelta($expected, $actual, $delta)`       | the numbers are within `$delta`              |
| `assertTrue`, `assertFalse`, `assertNull`, `assertNotNull`, `assertEmpty`, `assertNotEmpty` | what they say |
| `assertGreaterThan($expected, $actual)` and the like      | `$actual > $expected`, …                     |
| `assertCount($n, $haystack)`                              | it has `$n` items                            |
| `assertContains($needle, $haystack)`, `assertNotContains` | an item is (not) in it, compared with `===`  |
| `assertArrayHasKey($key, $array)`, `assertArrayNotHasKey` | the key is (not) there                       |
| `assertStringContainsString`, `assertStringStartsWith`, `assertStringEndsWith` | what they say           |
| `assertMatchesRegularExpression($pattern, $string)`      | the PCRE pattern matches                     |
| `assertInstanceOf(Foo::class, $actual)`                   | it's a `Foo`, or extends or implements it    |
| `assertIsInt`, `assertIsFloat`, `assertIsString`, `assertIsBool`, `assertIsArray`, `assertIsCallable`, `assertIsIterable`, `assertIsObject` | the value has that type |
| `assertObjectHasProperty($name, $object)`                 | the object has the property                  |
| `assertThrows(Foo::class, fn() => …)`                     | calling the function throws a `Foo`; returns what was thrown |

`assertThrows` is the koans' one addition: PHPUnit expects exceptions per test method, with
`$this->expectException()`, and koans have no test methods.

Like Raku's `Test` module, a failing assertion prints a TAP line and the koan carries on, so every
blank can be checked. Values in "your answer" and "PHP says" are written as PHP would write them:
`'text'`, `[1, 2]`, `['a' => 1]`, `null`.

## Files

```
node.mjs            PHP for the build tools: prelude, lint, running php-wasm under Node
pack.ts             PHP for the app: wording, worker, highlighting, error format
prelude.php         run before every koan: ___ and the assertions
runtime.lock.json   the pinned php-wasm package and the checksums of its files
tap.test.ts         how the app reads php-wasm's real output
koans/              the koans
```

## How a koan runs

- The worker, [public/runtime/php/worker.js](../../public/runtime/php/worker.js), gives **every
  run a fresh PHP**: functions and classes a koan declares would otherwise still be there next
  run, where declaring them again is a fatal error. The compiled module is kept, so a fresh PHP
  takes about a hundred milliseconds.
- The koan is written to `/koan.php` and required by a short script, which reports an error the
  koan doesn't catch with its class, message and line. A fatal error that isn't an exception
  (declaring a function twice) is reported the same way.
- The prelude's first line evals the prelude and closes PHP mode (`?>`), so the koan starts with
  its own `<?php` on line 2, and its line numbers shift by exactly one.
- **Warnings and notices are errors here**: the prelude turns them into exceptions, so reading an
  undefined variable or a missing array key stops the koan at its line, as many frameworks do.
- Node imports the same worker for `check:koans` and `npm test`, on the same build of PHP.

## Interpreter

php-wasm comes from the [`php-wasm`](https://www.npmjs.com/package/php-wasm) npm package. It holds
six versions of PHP (95 MB unpacked), so it isn't installed: `npm run fetch-runtime` downloads its
tarball from the npm registry, checks it against the registry's integrity hash and
[runtime.lock.json](runtime.lock.json), and takes out PHP 8.5's web build (16 MB of WebAssembly,
about 4 MB compressed) and the five small modules that load it. The same build runs under Node,
given stand-ins for the `document` and `window` its HTML5 support keeps references to. To move to
a newer version:

```sh
npm run fetch-runtime -- --lang php --update        # the latest, or: --update 0.3.0
npm run check:koans -- --lang php
npm test
```

A new version may name its WebAssembly file differently: update `PHP_WASM` in the worker and the
file list in `node.mjs`.

## Rules for PHP blanks

On top of [the rules for every language](../../README.md#rules-for-blanks):

- Start every koan with `<?php` on its own first line.
- A blank goes on a line that calls an assertion; `npm run check:koans` rejects one anywhere else.
- Put the expected value first, as PHPUnit does: `assertSame(___, $value)`.
- Never use `declare(strict_types=1)`: it must be a file's very first statement, and the prelude's
  line comes first. The koans run in PHP's default, coercive mode.
- Don't write `?>` in a comment in `prelude.php`: in PHP it ends PHP mode even there.

## Known limitations

- This PHP is **32-bit**: `PHP_INT_SIZE` is 4 and `PHP_INT_MAX` is 2147483647, where most servers'
  PHP is 64-bit. One koan says so.
- Extensions: the core ones, plus `bcmath`, `ctype`, `json`, `pcre`, `date`, `SPL`, `random` and
  `Reflection`. No `mbstring`, `iconv`, `gmp` or `intl`, so the koans use `preg_*` with `/u` for
  characters.
- No network, no files beyond memory, no `exec`.
