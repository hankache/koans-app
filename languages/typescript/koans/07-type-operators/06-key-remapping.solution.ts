type Getters<T> = { [K in keyof T as `get${Capitalize<K & string>}`]: () => T[K] };
expectTypeOf<keyof Getters<{ name: string; age: number }>>().toEqualTypeOf<'getName' | 'getAge'>(); // renamed keys
type NumbersOnly<T> = { [K in keyof T as T[K] extends number ? K : never]: T[K] };
expectTypeOf<NumbersOnly<{ id: number; name: string; age: number }>>().toEqualTypeOf<{ id: number; age: number }>(); // dropped keys
