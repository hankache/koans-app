// title: Distribution
// intro: A conditional type on a bare type parameter is asked once per member of a union. Wrapping both sides in brackets, `[T] extends [U]`, asks about the union as a whole.
type ToArray<T> = T extends unknown ? T[] : never;
expectTypeOf<ToArray<string | number>>().toEqualTypeOf<___>(); // each member is wrapped on its own
type ToArrayWhole<T> = [T] extends [unknown] ? T[] : never;
expectTypeOf<ToArrayWhole<string | number>>().toEqualTypeOf<___>(); // brackets keep the union whole
type IsNever<T> = T extends never ? true : false;
expectTypeOf<IsNever<never>>().toEqualTypeOf<___>(); // never is an empty union: nothing is asked
type IsNeverWhole<T> = [T] extends [never] ? true : false;
expectTypeOf<IsNeverWhole<never>>().toEqualTypeOf<___>(); // brackets fix that too
expectTypeOf<Exclude<'a' | 'b' | 'c', 'a'>>().toEqualTypeOf<___>(); // Exclude works by distribution
