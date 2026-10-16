type ToArray<T> = T extends unknown ? T[] : never;
expectTypeOf<ToArray<string | number>>().toEqualTypeOf<string[] | number[]>(); // each member is wrapped on its own
type ToArrayWhole<T> = [T] extends [unknown] ? T[] : never;
expectTypeOf<ToArrayWhole<string | number>>().toEqualTypeOf<(string | number)[]>(); // brackets keep the union whole
type IsNever<T> = T extends never ? true : false;
expectTypeOf<IsNever<never>>().toEqualTypeOf<never>(); // never is an empty union: nothing is asked
type IsNeverWhole<T> = [T] extends [never] ? true : false;
expectTypeOf<IsNeverWhole<never>>().toEqualTypeOf<true>(); // brackets fix that too
expectTypeOf<Exclude<'a' | 'b' | 'c', 'a'>>().toEqualTypeOf<'b' | 'c'>(); // Exclude works by distribution
