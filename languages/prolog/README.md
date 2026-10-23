# Prolog

Learn Prolog from its facts to its grammars, through 70 koans written the way Prolog is tested:
with [plunit](https://www.swi-prolog.org/pldoc/doc_for?object=section(%27packages/plunit.html%27)),
SWI-Prolog's unit tests. They run on [SWI-Prolog](https://www.swi-prolog.org) itself, compiled
to WebAssembly by its developers ([swipl-wasm](https://github.com/SWI-Prolog/npm-swipl-wasm)),
about 2 MB compressed.

**Try it:** [koans.app/prolog/](https://koans.app/prolog/)

## The path

| #  | Group                     | Koans | Covers |
|---:|---------------------------|------:|--------|
| 1  | Awakening                 | 4     | tests, atoms and variables, unification, `==` and `@<` |
| 2  | Facts and rules           | 5     | facts, multiple solutions, rules, recursive rules, `;` |
| 3  | Arithmetic                | 5     | `is`, `//`, `mod` and `rem`, comparing numbers, functions, `between`, `succ` and `plus` |
| 4  | Lists                     | 7     | `[H\|T]`, `member` and `length`, `append`, the list library, sorting, `select` and `permutation`, sets |
| 5  | Recursion                 | 5     | on lists, building lists, accumulators, on numbers, relations run backward |
| 6  | Higher-order predicates   | 4     | `call`, `maplist`, `[X]>>Goal`, `foldl` |
| 7  | Backtracking              | 4     | backtracking, generate and test, the order of clauses and goals, `forall` |
| 8  | Cut and negation          | 4     | `!`, `once`, `\+`, `->` |
| 9  | Collecting solutions      | 3     | `findall`, `bagof` and `setof`, `aggregate_all` |
| 10 | Atoms and strings         | 6     | atoms, characters, strings, conversions, `atomic_list_concat`, `format` |
| 11 | Terms                     | 3     | type checks, `functor`, `arg` and `=..`, operators |
| 12 | Structures                | 3     | terms as records, trees, `library(assoc)` |
| 13 | The database              | 3     | `assertz` and `retract`, state, global variables |
| 14 | Errors                    | 4     | `catch` and `throw`, error terms, `must_be`, `setup_call_cleanup` |
| 15 | Grammars                  | 4     | DCGs, arguments and `{}`, `phrase/3`, counting |
| 16 | Puzzles                   | 6     | FizzBuzz, Towers of Hanoi, N queens, run-length encoding, map coloring, a logic puzzle |

## How the tests are written

```prolog
:- begin_tests(arithmetic).
test('is evaluates arithmetic', X == ___) :- X is 1 + 2.
test('member fails for a missing item', ___) :- member(z, [a, b, c]).
test('every solution', all(X == ___)) :- member(X, [a, b]).
:- end_tests(arithmetic).
```

The prelude provides plunit's `test/1` and `test/2`, and `begin_tests` and `end_tests`. A test's
option says what its goal must do:

| Option | Passes when |
|--------|-------------|
| none, or `true` | the goal succeeds |
| `X == Value`, or `true(X == Value)` | the goal succeeds, and then `X == Value` holds; also `=`, `=:=`, `=@=`, `<` and the like |
| `fail` | the goal fails |
| `all(X == List)`, `set(X == List)` | `List` holds `X` for every solution, in order, or sorted without duplicates |
| `error(Formal)`, `throws(Term)` | the goal throws `error(Formal, _)`, or a term `Term` subsumes |

Unlike plunit's, a failing test prints a TAP line and the koan carries on, so every blank is
checked; a test that still holds a `___` (a variable, recognized by its name) fails without
running. Values in "Your answer" and "Prolog says" are written as Prolog writes them, with
quotes where needed: `[a, b]`, `'Hello world'`, `"text"`.

## How a koan runs

- The worker, [public/runtime/prolog/worker.js](../../public/runtime/prolog/worker.js), gives
  every run a fresh SWI-Prolog (about 50 ms: the WebAssembly is compiled once, and the library
  files are handed over from memory), so facts a koan asserts can't leak into the next run.
- The program, prelude and koan, is consulted as `/koan.pl`. As each test clause is loaded, the
  prelude's `term_expansion` turns it into a fact with its line and whether it holds a blank;
  then the prelude runs the tests.
- An error while loading (a syntax error, or a directive that raised) stops the koan, reported
  with its line; warnings are left out. The prelude marks its diagnostic lines, and the worker
  moves them to standard error.
- The prelude comes first, folded onto one line, so the koan's line numbers shift by exactly one.

Node imports the same worker for `check:koans` and `npm test`.

## Rules for Prolog blanks

On top of [the rules for every language](../../CONTRIBUTING.md#rules-for-blanks):

- A blank goes in a test's head, on a line that starts with `test(`: as the expected value
  (`X == ___`), or as the option itself (`___` for `true` or `fail`). `npm run check:koans`
  rejects one anywhere else.
- Put the definitions first, then the tests between `:- begin_tests(Unit).` and
  `:- end_tests(Unit).`, named after the koan.
- Don't load `library(plunit)`: the prelude provides `test/2`.
- Name each test with a quoted atom that describes it: it's what the learner sees beside the
  result.
- The prelude is folded onto one line, so it must never end a code line with a `%` comment.

## Files

```
node.mjs            Prolog for the build tools: prelude, lint, running SWI-Prolog under Node
pack.ts             Prolog for the app: wording, look, worker, highlighting, error format
highlight.ts        Prolog highlighting for the editor (CodeMirror has no Prolog mode)
prelude.pl          run before every koan: ___ and plunit's tests
runtime.lock.json   the pinned swipl-wasm version and the checksums of its files
tap.test.ts         how the app reads SWI-Prolog's real output
koans/              the koans
```

## Interpreter

SWI-Prolog comes from the [`swipl-wasm`](https://www.npmjs.com/package/swipl-wasm) npm package:
`swipl-web.js`, `swipl-web.wasm` and `swipl-web.data`, checked against the registry's integrity
hash and [runtime.lock.json](runtime.lock.json). To move to a newer version:

```sh
npm run fetch-runtime -- --lang prolog --update        # the latest, or: --update 8.2.5
npm run check:koans -- --lang prolog
npm test
```

## Known limitations

- Only the test options above: plunit's `setup`, `cleanup`, `forall` and `occurs_check` options
  aren't supported.
- No files or network: `consult` of other files, `open/3` on the file system and `http` libraries
  don't apply.
- Warnings, such as singleton variables, aren't shown.
