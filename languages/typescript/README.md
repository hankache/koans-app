# TypeScript

Learn TypeScript's types, from annotations to generics, through 65 koans. Its path is at
`#/typescript/`. The koans are type-checked with the real TypeScript compiler (6.0), in the
browser, and then run as JavaScript. They're tested the way TypeScript projects test with
[Vitest](https://vitest.dev): `expect` for values and `expectTypeOf` for types.

## The path

| #  | Group                      | Koans | Covers                                                                 |
|----|----------------------------|-------|------------------------------------------------------------------------|
| 1  | Awakening                  | 6     | `expect` and `expectTypeOf`, inference, literal types, `any` and `unknown`, `void` and `never`, `as const` |
| 2  | Object types               | 6     | interfaces, type aliases and `&`, optional and readonly, index signatures and records, structural typing, methods |
| 3  | Arrays and tuples          | 4     | arrays, readonly arrays, tuples, the types array methods return        |
| 4  | Unions and narrowing       | 8     | unions, `typeof`, truthiness and `===`, `in` and `instanceof`, discriminated unions, type predicates, assertion functions, exhaustiveness |
| 5  | Functions                  | 5     | parameters and results, optional/default/rest, function types, overloads, `this` parameters |
| 6  | Generics                   | 4     | generic functions, constraints, generic types, `const` type parameters |
| 7  | Type operators             | 7     | `keyof` and `typeof`, indexed access, conditional types, `infer`, mapped types, key remapping, template literal types |
| 8  | Utility types              | 5     | `Partial`/`Required`/`Readonly`, `Pick`/`Omit`, `Exclude`/`Extract`/`NonNullable`, `ReturnType`/`Parameters`/`Awaited`, `Record`/`InstanceType` |
| 9  | Classes                    | 5     | parameter properties, access modifiers, `abstract`, `implements`, static and generic classes |
| 10 | Enums, satisfies and more  | 5     | enums, `as const` objects, `satisfies`, branded types, async types     |
| 11 | Advanced types             | 6     | recursive types, distribution and `[T]`, defaults, `const` and `NoInfer`, declaration merging, constructor types, decorators |
| 12 | Type puzzles               | 4     | tuple tricks, string types, type arithmetic, typed events             |

## How the tests are written

Values are tested with the JavaScript koans' `expect` (see
[its matchers](../javascript/README.md#how-the-tests-are-written)). Types are tested with
`expectTypeOf`, whose description is the comment that ends its line:

```ts
expectTypeOf(age).toEqualTypeOf<___>(); // a const keeps its literal type
expectTypeOf<Pick<User, 'id'>>().toEqualTypeOf<___>(); // a type, checked directly
expectTypeOf(load).returns.resolves.toEqualTypeOf<___>(); // what it eventually gives
```

| Check                                        | Passes when                                       |
|----------------------------------------------|---------------------------------------------------|
| `expectTypeOf(value)` or `expectTypeOf<T>()` | starts a check on a value's type, or on a type    |
| `.toEqualTypeOf<U>()`                        | the type is exactly `U`                           |
| `.toExtend<U>()`                             | the type is assignable to `U`                     |
| `.returns`, `.parameter(n)`                  | move to a function's result, or its `n`th parameter (from 0) |
| `.resolves`, `.items`                        | move to what a promise resolves to, or an array's items |
| `.not`                                       | turns the check around                            |

"Exactly" means each type is assignable to the other, so `toEqualTypeOf<number>()` fails for a
`const age = 36`, whose type is `36`. A blank can be a value (`expect(x).toBe(___)`) or a type
(`toEqualTypeOf<___>()`). A type check that fails shows "Your answer" against the type TypeScript
found, like any other failed test.

## How a koan runs

The worker, [public/runtime/typescript/worker.js](../../public/runtime/typescript/worker.js), does
three things with each koan:

1. **Type-checks it** with the compiler, in strict mode, against the ES2023 library files and a
   few declarations of its own (`___`, `expect`, `expectTypeOf`, `console`, `setTimeout`,
   `structuredClone`). It works out every `expectTypeOf` check here, before the run. **Any other type
   error stops the koan** with its line and message (`TS2322: Type 'string' is not assignable…`),
   as a compiler would.
2. **Compiles it** to JavaScript, with a source map.
3. **Runs it** on the JavaScript worker's code
   ([public/runtime/javascript/worker.js](../../public/runtime/javascript/worker.js)), which
   reports each type check when the koan reaches it, in order with the other tests. The source
   map turns the lines that ran back into the koan's lines, so failures point at the right line
   even after type-only lines (interfaces, type aliases, overloads) are removed.

Node imports the same worker for `check:koans` and `npm test`. The compiler is 9 MB (1.7 MB
compressed) plus 0.5 MB of library files, downloaded once when TypeScript is first opened; after
that, a run takes a few tens of milliseconds.

## Files

```
node.mjs            TypeScript for the build tools: prelude, lint, running koans under Node
pack.ts             TypeScript for the app: wording, worker, highlighting, error format
prelude.ts          run before every koan (one line)
runtime.lock.json   the pinned TypeScript version and the checksums of its files
tap.test.ts         how the app reads the worker's real output
koans/              the koans
```

## Compiler

The compiler comes from the `typescript` npm package, the same one the project type-checks its own
code with, pinned by `package-lock.json`; `npm run fetch-runtime` copies `typescript.js` and the
library files into `public/runtime/typescript/` and checks them against
[runtime.lock.json](runtime.lock.json). Upgrading TypeScript for the project therefore upgrades the
koans' compiler too: `fetch-runtime` stops until it's re-pinned.

```sh
npm install --save-dev typescript@<version>
npm run fetch-runtime -- --lang typescript --update
npm run check:koans -- --lang typescript
npm test
```

## Rules for TypeScript blanks

On top of [the rules for every language](../../README.md#rules-for-blanks) and
[JavaScript's](../javascript/README.md#rules-for-javascript-blanks):

- A koan, blanks and all, must type-check: blanks go where `expect`'s matchers accept anything, or
  in a type argument of `expectTypeOf`'s chain.
- Put each `expectTypeOf` check on one line, ending with a `//` comment that describes it, and
  where the koan actually reaches it: a check in a branch that never runs is never reported.
- Never switch type checking off (`@ts-ignore`, `@ts-expect-error`, `@ts-nocheck`):
  `npm run check:koans` rejects it.
- The koans are type-checked one at a time by the worker, not as part of the project, so an editor
  may show them as errors. `npm run check:koans` is the judge.

## Known limitations

- No modules: koans can't `import`, so there are no module or declaration-file koans.
- Mutual assignability counts `any` as equal to every type, so `toEqualTypeOf<any>()` always passes. (Vitest's
  own `expectTypeOf` is stricter about `any`.)
