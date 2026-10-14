// title: Mapped types
// intro: `{ [K in keyof T]: … }` builds an object type with a property for each key of `T`. Template literal types build string types from other strings.
type Flags<T> = { [K in keyof T]: boolean };
assert.typeEqual<Flags<{ a: string; b: number }>, ___>('a property for each key');
type Nullable<T> = { [K in keyof T]: T[K] | null };
assert.typeEqual<Nullable<{ x: number }>, ___>('T[K] reads the old type');
type Greeting = `hello ${'world' | 'there'}`;
assert.typeEqual<Greeting, ___>('a template literal type, over a union');
type Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] };
assert.typeEqual<Getters<{ name: string }>, ___>('as renames the keys');
