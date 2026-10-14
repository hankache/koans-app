type ItemOf<T> = T extends (infer U)[] ? U : never;
expectTypeOf<ItemOf<boolean[]>>().toEqualTypeOf<boolean>(); // the item type of an array
type ResultOf<F> = F extends (...args: never[]) => infer R ? R : never;
expectTypeOf<ResultOf<() => Date>>().toEqualTypeOf<Date>(); // a function's result
type Unwrap<T> = T extends Promise<infer V> ? Unwrap<V> : T;
expectTypeOf<Unwrap<Promise<Promise<string>>>>().toEqualTypeOf<string>(); // recursively
type Head<T> = T extends [infer H, ...unknown[]] ? H : never;
expectTypeOf<Head<[1, 2, 3]>>().toEqualTypeOf<1>(); // the first item of a tuple
