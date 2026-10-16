# Ruby

Learn Ruby from its objects to its metaprogramming, through 90 koans written the way most Ruby is
tested: with [RSpec](https://rspec.info)'s `expect`. They run on
[ruby.wasm](https://github.com/ruby/ruby.wasm): CRuby 4.0 compiled to WebAssembly. Its path is at
`#/ruby/`.

The koans are new: the original [Ruby Koans](https://www.rubykoans.com/), which inspired this
project, have a license that can't be combined with this one, so nothing here is copied from them.

## The path

| #  | Group                            | Koans | Covers                                                            |
|----|----------------------------------|-------|-------------------------------------------------------------------|
| 1  | Awakening                        | 6     | `expect`, truth, `nil`, objects, equality, errors                 |
| 2  | Numbers                          | 6     | integer arithmetic, big integers, floats, rationals, conversion, numeric methods |
| 3  | Strings                          | 7     | quotes and interpolation, methods, slicing, mutation and freezing, formatting, heredocs, characters |
| 4  | Symbols and regular expressions  | 4     | symbols, regexp basics, `scan` and `gsub`, named captures         |
| 5  | Ranges                           | 3     | ranges, endless ranges and `case`, slicing and `clamp`, `cover?`  |
| 6  | Arrays                           | 7     | arrays, adding and removing, combining, sorting, transforming, searching, destructuring |
| 7  | Hashes                           | 5     | hashes, defaults, iterating and transforming, grouping, merging   |
| 8  | Enumerable                       | 5     | `reduce`, neighbours, enumerators, `lazy`, your own `Enumerable`  |
| 9  | Control flow                     | 8     | conditions, `case`/`when`, pattern matching, loops, values, `===`, `catch`/`throw`, fibers |
| 10 | Methods                          | 5     | defining, keyword arguments, splats, method objects, naming conventions |
| 11 | Blocks, procs and lambdas        | 5     | `yield`, explicit blocks, procs and lambdas, closures, composition |
| 12 | Classes                          | 9     | instances, accessors, class methods, inheritance, visibility, `to_s` and `==`, `Comparable`, operators, copies |
| 13 | Modules                          | 4     | mixins, `prepend` and `extend`, namespaces, module functions      |
| 14 | Structs and data                 | 2     | `Struct`, `Data`                                                  |
| 15 | Exceptions                       | 4     | `rescue`/`else`/`ensure`, the hierarchy, custom exceptions, `retry` and causes |
| 16 | Metaprogramming                  | 5     | sending messages, `define_method`, `method_missing`, open classes and refinements, introspection |
| 17 | Puzzles                          | 5     | FizzBuzz, word frequencies, anagrams, run-length encoding, Roman numerals |

## How the tests are written

The RSpec way, defined by [prelude.rb](prelude.rb):

```ruby
expect(-7 % 3).to eq(___), "% takes the divisor's sign"
expect { 1 / 0 }.to raise_error(___), 'dividing an integer by zero'
```

RSpec's second argument to `to` is a failure message; here it describes the test. The matchers:

| Matcher                                                   | Passes when                                |
|-----------------------------------------------------------|--------------------------------------------|
| `eq(x)`, `eql(x)`, `equal(x)`                             | `==`, `eql?`, the very same object         |
| `be(x)`, `be`, `be > x` (and `<`, `<=`, `>=`)             | the same object, truthy, a comparison      |
| `be_truthy`, `be_falsey`, `be_nil`                        | what they say                              |
| `be_a(Class)`, `be_an_instance_of(Class)`, `respond_to(:m)` | a kind of, exactly, answers the message  |
| `be_within(delta).of(x)`, `be_between(a, b)`              | numbers close to, or in a range            |
| `include(…)`, `contain_exactly(…)`, `match_array([…])`, `start_with`, `end_with`, `all(matcher)` | collections and strings |
| `match(/re/)`, `have_attributes(k: v)`, `satisfy { … }`   | what they say                              |
| `be_empty`, `be_even`, … `have_key(:k)`, …                | the predicate `empty?`, `even?`, `has_key?(:k)` |
| `raise_error(Class, message)`                             | the block raises it; the message is a string or pattern |
| `change { value }.by(n)` / `.from(a).to(b)`               | the block changes the value so             |
| `output(text).to_stdout`                                  | the block prints that                      |

`not_to` (or `to_not`) turns an expectation around. Unlike RSpec, a failing expectation prints a TAP
line and the koan carries on, so every blank can be checked. Values in "your answer" and "Ruby
says" are written with `inspect`.

## Files

```
node.mjs            Ruby for the build tools: prelude, lint, running ruby.wasm under Node
pack.ts             Ruby for the app: wording, worker, highlighting, error format
prelude.rb          run before every koan: ___, expect and the matchers
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
  Each expectation finds the learner's line with `caller_locations`.
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

- A blank goes on the line of its `.to`, `.not_to` or `.to_not`, as a value: in `expect(…)` or as
  a matcher's argument. `npm run check:koans` rejects one anywhere else.
- When an answer is a hash, keep the matcher's parentheses: `eq({ a: 1 })`. Without them,
  `eq { a: 1 }` reads the braces as a block.
- Expectations are for the top level of a koan, or a method defined there: matchers like
  `be_empty` are answered by the top-level object.
- No `require`: this Ruby has no standard library. Everything core is there, including `Set`,
  `Struct`, `Data`, `Rational` and `Comparable`. `npm run check:koans` rejects a `require`.

## Known limitations

- No standard library, so no `require 'json'`, `'date'` or `'set'` (`Set` is built in).
- No threads, no network, no files beyond memory.
