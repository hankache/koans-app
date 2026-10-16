// title: Type arithmetic
// intro: Types can't add numbers, but tuples can stand in for them: build a tuple of length N, join two, and read the length back.
type Build<N extends number, T extends unknown[] = []> = T['length'] extends N ? T : Build<N, [...T, unknown]>;
expectTypeOf<Build<2>>().toEqualTypeOf<___>(); // a tuple of length 2
type Add<A extends number, B extends number> = [...Build<A>, ...Build<B>]['length'];
expectTypeOf<Add<2, 3>>().toEqualTypeOf<___>(); // join two, read the length
type Subtract<A extends number, B extends number> = Build<A> extends [...Build<B>, ...infer Rest] ? Rest['length'] : never;
expectTypeOf<Subtract<7, 3>>().toEqualTypeOf<___>(); // take one off the other
expectTypeOf<Subtract<3, 7>>().toEqualTypeOf<___>(); // no negative numbers here
