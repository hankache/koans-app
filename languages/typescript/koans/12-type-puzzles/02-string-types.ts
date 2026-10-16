// title: String types
// intro: Template literal types can take strings apart with `infer`, and recursion repeats that until nothing is left.
type Split<S extends string, D extends string> = S extends `${infer Head}${D}${infer Rest}` ? [Head, ...Split<Rest, D>] : [S];
expectTypeOf<Split<'a,b,c', ','>>().toEqualTypeOf<___>(); // split at every comma
type TrimLeft<S extends string> = S extends ` ${infer Rest}` ? TrimLeft<Rest> : S;
expectTypeOf<TrimLeft<'   hi'>>().toEqualTypeOf<___>(); // strip leading spaces
type Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] };
expectTypeOf<keyof Getters<{ name: string; age: number }>>().toEqualTypeOf<___>(); // keys renamed into getters
type Chars<S extends string> = S extends `${infer C}${infer Rest}` ? C | Chars<Rest> : never;
expectTypeOf<Chars<'abba'>>().toEqualTypeOf<___>(); // a string's characters, as a union
