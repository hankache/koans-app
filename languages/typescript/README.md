# TypeScript

Learn TypeScript's types, from annotations to generics, through 65 koans tested the way TypeScript
projects test with [Vitest](https://vitest.dev): `expect` for values and `expectTypeOf` for types.
Each koan is type-checked by the real TypeScript compiler, version 6, in the browser, then run as
JavaScript.

**Try it:** [koans.app/typescript/](https://koans.app/typescript/)

## The path

| #  | Group                     | Koans | Covers |
|---:|---------------------------|------:|--------|
| 1  | Awakening                 | 6     | `expect` and `expectTypeOf`, inference, literal types, `any` and `unknown`, `void` and `never`, `as const` |
| 2  | Object types              | 6     | interfaces, type aliases and `&`, optional and readonly, index signatures and records, structural typing, methods |
| 3  | Arrays and tuples         | 4     | arrays, readonly arrays, tuples, the types array methods return |
| 4  | Unions and narrowing      | 8     | unions, `typeof`, truthiness and `===`, `in` and `instanceof`, discriminated unions, type predicates, assertion functions, exhaustiveness |
| 5  | Functions                 | 5     | parameters and results, optional, default and rest parameters, function types, overloads, `this` parameters |
| 6  | Generics                  | 4     | generic functions, constraints, generic types, `const` type parameters |
| 7  | Type operators            | 7     | `keyof` and `typeof`, indexed access, conditional types, `infer`, mapped types, key remapping, template literal types |
| 8  | Utility types             | 5     | `Partial`/`Required`/`Readonly`, `Pick`/`Omit`, `Exclude`/`Extract`/`NonNullable`, `ReturnType`/`Parameters`/`Awaited`, `Record`/`InstanceType` |
| 9  | Classes                   | 5     | parameter properties, access modifiers, `abstract`, `implements`, static and generic classes |
| 10 | Enums, satisfies and more | 5     | enums, `as const` objects, `satisfies`, branded types, async types |
| 11 | Advanced types            | 6     | recursive types, distribution and `[T]`, defaults, `const` and `NoInfer`, declaration merging, constructor types, decorators |
| 12 | Type puzzles              | 4     | tuple tricks, string types, type arithmetic, typed events |

## How the tests are written

Values are tested with the JavaScript koans' `expect` (see
[its matchers](../javascript/README.md#how-the-tests-are-written)). Types are tested with
`expectTypeOf`, described by the comment that ends its line:

```ts
expectTypeOf(age).toEqualTypeOf<___>(); // a const keeps its literal type
expectTypeOf<Pick<User, 'id'>>().toEqualTypeOf<___>(); // a type, checked directly
expectTypeOf(load).returns.resolves.toEqualTypeOf<___>(); // what it eventually gives
```

| Check | Passes when |
|-------|-------------|
| `expectTypeOf(value)` or `expectTypeOf<T>()` | starts a check on a value's type, or on a type |
| `.toEqualTypeOf<U>()` | the type is exactly `U` |
| `.toExtend<U>()` | the type is assignable to `U` |
| `.returns`, `.parameter(n)` | moves to a function's result, or to its `n`th parameter (from 0) |
| `.resolves`, `.items` | moves to what a promise resolves to, or to an array's items |
| `.not` | turns the check around |

"Exactly" means each type is assignable to the other, so `toEqualTypeOf<number>()` fails for
`const age = 36`, whose type is `36`. A blank can be a value (`expect(x).toBe(___)`) or a type
(`toEqualTypeOf<___>()`). A failed type check shows "Your answer" against the type TypeScript
found, like any other failed test.

## How a koan runs

The worker, [public/runtime/typescript/worker.js](../../public/runtime/typescript/worker.js), does
three things with each koan:

1. **Type-checks it** with the compiler, in strict mode, against the ES2023 library and a few
   declarations of its own (`___`, `expect`, `expectTypeOf`, `console`, `setTimeout`,
   `structuredClone`). Every `expectTypeOf` check is worked out here, before the run. **Any other
   type error stops the koan** with its line and message
   (`TS2322: Type 'string' is not assignable…`), as a compiler would.
2. **Compiles it** to JavaScript, with a source map.
3. **Runs it** on the JavaScript worker's code
   ([public/runtime/javascript/worker.js](../../public/runtime/javascript/worker.js)), which
   reports each type check when the koan reaches it, in order with the other tests. The source map
   turns the lines that ran back into the koan's lines, so failures point at the right line even
   after type-only lines (interfaces, type aliases, overloads) are removed.

Node imports the same worker for `check:koans` and `npm test`. After the compiler has loaded, a run
takes a few tens of milliseconds.

## Rules for TypeScript blanks

On top of [the rules for every language](../../CONTRIBUTING.md#rules-for-blanks) and
[JavaScript's](../javascript/README.md#rules-for-javascript-blanks):

- A koan, blanks and all, must type-check: blanks go where `expect`'s matchers accept anything, or
  in a type argument of an `expectTypeOf` chain.
- Put each `expectTypeOf` check on one line, ending with a `//` comment that describes it, and where
  the koan actually reaches it: a check in a branch that never runs is never reported.
- Never switch type checking off (`@ts-ignore`, `@ts-expect-error`, `@ts-nocheck`):
  `npm run check:koans` rejects it.
- The worker type-checks each koan on its own, not as part of the project, so an editor may flag
  the koans as errors. `npm run check:koans` is the judge.

## Files

```
node.mjs            TypeScript for the build tools: prelude, lint, running koans under Node
pack.ts             TypeScript for the app: wording, look, worker, highlighting, error format
prelude.ts          run before every koan (one line)
runtime.lock.json   the pinned TypeScript version and the checksums of its files
tap.test.ts         how the app reads the worker's real output
koans/              the koans
```

## Interpreter

The compiler comes from the `typescript` npm package, the same one that type-checks the project's
own code, pinned by `package-lock.json`. `npm run fetch-runtime` copies `typescript.js` and the
library files into `public/runtime/typescript/` and checks them against
[runtime.lock.json](runtime.lock.json). It's 9 MB (1.7 MB compressed) plus 0.5 MB of library files,
downloaded once, when TypeScript is first opened.

Upgrading TypeScript for the project upgrades the koans' compiler too, and `fetch-runtime` stops
until the new version is pinned:

```sh
npm install --save-dev typescript@<version>
npm run fetch-runtime -- --lang typescript --update
npm run check:koans -- --lang typescript
npm test
```

## Known limitations

- No modules: koans can't `import`, so there are no koans on modules or declaration files.
- Mutual assignability treats `any` as equal to every type, so `toEqualTypeOf<any>()` always passes.
  (Vitest's own `expectTypeOf` is stricter about `any`.)
