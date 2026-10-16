// title: Tuple tricks
// intro: A tuple's `length` is a literal type, and `infer` with rest elements takes a tuple apart. Recursion puts it back together in another order.
type Length<T extends readonly unknown[]> = T['length'];
expectTypeOf<Length<[1, 2, 3]>>().toEqualTypeOf<___>(); // a tuple knows its length
type First<T extends unknown[]> = T extends [infer F, ...unknown[]] ? F : never;
expectTypeOf<First<['a', 'b']>>().toEqualTypeOf<___>(); // the first element
type Last<T extends unknown[]> = T extends [...unknown[], infer L] ? L : never;
expectTypeOf<Last<['a', 'b', 'c']>>().toEqualTypeOf<___>(); // the last element
type Reverse<T extends unknown[]> = T extends [infer H, ...infer R] ? [...Reverse<R>, H] : [];
expectTypeOf<Reverse<[1, 2, 3]>>().toEqualTypeOf<___>(); // reversed, one element at a time
expectTypeOf<First<[]>>().toEqualTypeOf<___>(); // an empty tuple has no first
