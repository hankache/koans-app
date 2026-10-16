type Length<T extends readonly unknown[]> = T['length'];
expectTypeOf<Length<[1, 2, 3]>>().toEqualTypeOf<3>(); // a tuple knows its length
type First<T extends unknown[]> = T extends [infer F, ...unknown[]] ? F : never;
expectTypeOf<First<['a', 'b']>>().toEqualTypeOf<'a'>(); // the first element
type Last<T extends unknown[]> = T extends [...unknown[], infer L] ? L : never;
expectTypeOf<Last<['a', 'b', 'c']>>().toEqualTypeOf<'c'>(); // the last element
type Reverse<T extends unknown[]> = T extends [infer H, ...infer R] ? [...Reverse<R>, H] : [];
expectTypeOf<Reverse<[1, 2, 3]>>().toEqualTypeOf<[3, 2, 1]>(); // reversed, one element at a time
expectTypeOf<First<[]>>().toEqualTypeOf<never>(); // an empty tuple has no first
