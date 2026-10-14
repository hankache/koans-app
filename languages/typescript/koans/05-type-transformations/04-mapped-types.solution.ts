type Flags<T> = { [K in keyof T]: boolean };
assert.typeEqual<Flags<{ a: string; b: number }>, { a: boolean; b: boolean }>('a property for each key');
type Nullable<T> = { [K in keyof T]: T[K] | null };
assert.typeEqual<Nullable<{ x: number }>, { x: number | null }>('T[K] reads the old type');
type Greeting = `hello ${'world' | 'there'}`;
assert.typeEqual<Greeting, 'hello world' | 'hello there'>('a template literal type, over a union');
type Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] };
assert.typeEqual<Getters<{ name: string }>, { getName: () => string }>('as renames the keys');
