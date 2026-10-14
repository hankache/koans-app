// title: infer
// intro: In a conditional type, `infer X` captures part of the type being matched, so it can be used in the result.
type ItemOf<T> = T extends (infer U)[] ? U : never;
expectTypeOf<ItemOf<boolean[]>>().toEqualTypeOf<___>(); // the item type of an array
type ResultOf<F> = F extends (...args: never[]) => infer R ? R : never;
expectTypeOf<ResultOf<() => Date>>().toEqualTypeOf<___>(); // a function's result
type Unwrap<T> = T extends Promise<infer V> ? Unwrap<V> : T;
expectTypeOf<Unwrap<Promise<Promise<string>>>>().toEqualTypeOf<___>(); // recursively
type Head<T> = T extends [infer H, ...unknown[]] ? H : never;
expectTypeOf<Head<[1, 2, 3]>>().toEqualTypeOf<___>(); // the first item of a tuple
