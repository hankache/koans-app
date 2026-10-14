// title: Key remapping
// intro: In a mapped type, `as` renames each key, or drops it by mapping it to `never`.
type Getters<T> = { [K in keyof T as `get${Capitalize<K & string>}`]: () => T[K] };
expectTypeOf<keyof Getters<{ name: string; age: number }>>().toEqualTypeOf<___>(); // renamed keys
type NumbersOnly<T> = { [K in keyof T as T[K] extends number ? K : never]: T[K] };
expectTypeOf<NumbersOnly<{ id: number; name: string; age: number }>>().toEqualTypeOf<___>(); // dropped keys
