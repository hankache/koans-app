# OCaml

Learn OCaml from its types to its modules, through 75 koans written the way OCaml is often
tested: with [Alcotest](https://github.com/mirage/alcotest)'s `check`. They run on the toplevel of
[ocaml.org's playground](https://ocaml.org/play): the OCaml 5.0 compiler and toplevel, compiled to
JavaScript by js_of_ocaml, about 800 KB compressed.

**Try it:** [koans.app/ocaml/](https://koans.app/ocaml/)

## The path

| #  | Group                     | Koans | Covers |
|---:|---------------------------|------:|--------|
| 1  | Awakening                 | 4     | `check`, `let`, types, `=` and `compare` |
| 2  | Numbers                   | 4     | `/` and `mod`, floats and their operators, conversions, the `Int` and `Float` modules |
| 3  | Strings and characters    | 4     | strings, the `String` module, characters, `Printf.sprintf` |
| 4  | Functions                 | 5     | defining and applying, `fun`, currying, labeled and optional arguments, `\|>` and `@@` |
| 5  | Recursion                 | 4     | `let rec`, tail recursion, `let rec … and`, classics |
| 6  | Lists                     | 5     | `::` and `@`, the `List` module, `map` and `filter`, folds, searching and sorting |
| 7  | Pattern matching          | 5     | `match`, lists, tuples, `when`, or-patterns and `as`, patterns in `let` |
| 8  | Tuples and records        | 4     | tuples, records, `{ r with … }`, mutable fields |
| 9  | Variants                  | 5     | enumerations, constructors with data, recursive variants, type parameters, testables |
| 10 | Options and results       | 4     | `option`, the `Option` module, `result`, `Result.bind` |
| 11 | Higher-order functions    | 4     | functions as arguments, closures, composition, `List.iter` |
| 12 | Exceptions                | 4     | `raise` and `try`, your own exceptions, the standard ones, `exception` in `match` |
| 13 | Imperative OCaml          | 4     | references, arrays, `for` and `while`, `Buffer` |
| 14 | Modules                   | 5     | `struct`, signatures and abstract types, `Map.Make`, your own functor, `include` |
| 15 | Collections               | 3     | `Set`, `Map`, `Hashtbl` |
| 16 | Polymorphism              | 3     | type variables, type annotations, polymorphic variants |
| 17 | Laziness and sequences    | 3     | `lazy`, `Seq`, `Seq.unfold` |
| 18 | Puzzles                   | 5     | FizzBuzz, word frequencies, run-length encoding, Roman numerals, quicksort |

## How the tests are written

```ocaml
let () = check int "/ drops the remainder" ___ (17 / 5)
let () = check (list string) "split_on_char" ___ (String.split_on_char ',' "a,b")
let () = check_raises "dividing by zero" ___ (fun () -> ignore (1 / 0))
```

The prelude defines Alcotest's `check`, `check_raises` and `fail`, and its testables, which say
how to compare and print a type: `int`, `bool`, `string`, `char`, `unit`, `list`, `array`,
`option`, `result`, `pair`, `triple`, and `Alcotest.float epsilon` and `Alcotest.testable` for
the rest. In Alcotest, `check int` is written `Alcotest.(check int)`; the prelude opens it, all
but `float`, which would hide `Stdlib.float`.

Unlike Alcotest's, a failing check prints a TAP line and the koan carries on, so every blank is
checked; a check whose expected value is still a `___` fails. Values in "Your answer" and "OCaml
says" are printed by the testable, the way OCaml writes them: `"text"`, `[1; 2]`, `Some (-1)`.

## How a koan runs

- The worker, [public/runtime/ocaml/worker.js](../../public/runtime/ocaml/worker.js), runs
  `worker.min.js`, the playground's toplevel, inside itself rather than as a worker of its own,
  and talks to it in the format it expects: calls marshaled with OCaml's `Marshal`, made with its
  own js_of_ocaml runtime.
- Every run gets a fresh toplevel, so definitions a koan makes can't leak into the next run.
  Starting one and running the prelude take about half a second, so in the browser the worker
  gets the next one ready while the learner reads the result.
- The koan runs one top-level item at a time (each item starts at the left margin with `let`,
  `type`, `module`, `open`, `exception`, `external`, `include` or `class`), so an error stops it
  at that item and is reported with its line. A type error stops it too, as it would stop the
  compiler.
- Before it runs, the worker rewrites the koan without moving a line: each `___` becomes a value
  that typechecks anywhere and that `check` recognizes, and each `check` and `check_raises` learns
  its own line.
- The prelude comes first, on one line, so the koan's line numbers shift by exactly one. The
  toplevel keeps standard output and standard error apart, so the prelude marks its diagnostic
  lines, and the worker moves them to standard error.

Node imports the same worker for `check:koans` and `npm test`, running the toplevel in a `vm`
context.

## Rules for OCaml blanks

On top of [the rules for every language](../../CONTRIBUTING.md#rules-for-blanks):

- A blank stands for a check's expected value, on the line where its `check` or `check_raises` is
  called; `npm run check:koans` rejects one anywhere else. Keep each check on one line.
- Start each top-level item at the left margin, and indent the lines that continue it.
- An answer that is an application, or a negative number, needs parentheses: `(Some 5)`, `(-3)`.
  Say so in the intro of the first koan that needs it.
- Don't use `Bool`, `Unit`, `Complex`, `Weak`, `In_channel` or `Out_channel` (see below).
- The prelude is folded onto one line, so each of its comments must sit on a line of its own.

## Files

```
node.mjs            OCaml for the build tools: prelude, lint, running the toplevel under Node
pack.ts             OCaml for the app: wording, look, worker, highlighting, error format
prelude.ml          run before every koan: Alcotest's check and testables
runtime.lock.json   the pinned ocaml.org commit and the checksums of its files
tap.test.ts         how the app reads the toplevel's real output
koans/              the koans
```

## Interpreter

The toplevel comes from the [`playground/asset`](https://github.com/ocaml/ocaml.org/tree/main/playground/asset)
folder of ocaml.org's repository, the only place it's published: `worker.min.js` and the standard
library's compiled interfaces, `stdlib/*.cmi`. `npm run fetch-runtime` downloads them at the commit
pinned in [runtime.lock.json](runtime.lock.json) and checks each against its checksum there. To
move to a newer commit:

```sh
npm run fetch-runtime -- --lang ocaml --update        # the latest change to that folder, or: --update <commit>
npm run check:koans -- --lang ocaml
npm test
```

## Known limitations

- **OCaml 5.0:** the playground was built with OCaml 5.0, so later additions to the standard
  library (such as `Fun.compose` or `List.is_empty`) aren't there.
- **Missing modules:** the toplevel has the interfaces of every standard library module, but not
  the code of `Bool`, `Unit`, `Complex`, `Weak`, `In_channel` and `Out_channel`: using them is an
  error ("Reference to undefined global").
- **Warnings** are turned off, so a missing case in a `match` isn't reported.
- **No libraries** beyond the standard library, and no `#use` or `#require`.
