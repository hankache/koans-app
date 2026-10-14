# TypeScript

Learn TypeScript's types, from annotations to generics, through 30 koans. Its path is at
`#/typescript/`. The koans are type-checked with the real TypeScript compiler (6.0), in the
browser, and then run as JavaScript.

## The path

| # | Group                      | Koans | Covers                                                                 |
|---|----------------------------|-------|------------------------------------------------------------------------|
| 1 | Awakening                  | 5     | the assertions, inference, `any`/`unknown`/`never`, unions, `as const` |
| 2 | Object types               | 5     | interfaces, optional and readonly, tuples, records, structural typing  |
| 3 | Narrowing                  | 5     | `typeof`, truthiness and `===`, `in` and `instanceof`, discriminated unions, predicates and exhaustiveness |
| 4 | Functions                  | 5     | parameters and results, optional and default parameters, function types, generics, overloads |
| 5 | Generics and utility types | 5     | generic types, `keyof` and indexed access, utility types, mapped types, conditional types |
| 6 | Classes, enums and async   | 5     | classes, `implements` and `abstract`, `satisfies`, enums, async types  |

## The assertions

The JavaScript koans' assertions (Node's `assert` API: `assert.equal`, `assert.deepEqual`,
`assert.throws`, …), plus two about types:

| Assertion                          | Passes when                                  |
|------------------------------------|----------------------------------------------|
| `assert.type<T>(value, msg)`       | the value's type is exactly `T`              |
| `assert.typeEqual<A, B>(msg)`      | `A` and `B` are the same type                |

"Exactly" means each type is assignable to the other, so `assert.type<number>(age)` fails for a
`const age = 36`, whose type is `36`. A blank can be a value (`assert.equal(x, ___)`) or a type
(`assert.type<___>(x)`). A type check that fails shows "Your answer" against the type TypeScript
found, like any other failed assertion.

## How a koan runs

The worker, [public/runtime/typescript/worker.js](../../public/runtime/typescript/worker.js), does
three things with each koan:

1. **Type-checks it** with the compiler, in strict mode, against the ES2023 library files and a
   few declarations of its own (`___`, `assert`, `console`, `setTimeout`, `structuredClone`). It
   works out every `assert.type` and `assert.typeEqual` here, before the run. **Any other type
   error stops the koan** with its line and message (`TS2322: Type 'string' is not assignable…`),
   as a compiler would.
2. **Compiles it** to JavaScript, with a source map.
3. **Runs it** on the JavaScript worker's code
   ([public/runtime/javascript/worker.js](../../public/runtime/javascript/worker.js)), which
   reports each type check when the koan reaches it, in order with the other assertions. The source
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

- A koan, blanks and all, must type-check: blanks go where the assertions' parameters accept
  anything, or in the type argument of `assert.type` and `assert.typeEqual`.
- Never switch type checking off (`@ts-ignore`, `@ts-expect-error`, `@ts-nocheck`):
  `npm run check:koans` rejects it.
- The koans are type-checked one at a time by the worker, not as part of the project, so an editor
  may show them as errors. `npm run check:koans` is the judge.

## Known limitations

- No modules: koans can't `import`, so there are no module or declaration-file koans.
- Mutual assignability counts `any` as equal to every type, so `assert.type<any>(x)` always passes.
