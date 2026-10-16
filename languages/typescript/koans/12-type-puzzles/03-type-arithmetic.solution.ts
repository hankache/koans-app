type Build<N extends number, T extends unknown[] = []> = T['length'] extends N ? T : Build<N, [...T, unknown]>;
expectTypeOf<Build<2>>().toEqualTypeOf<[unknown, unknown]>(); // a tuple of length 2
type Add<A extends number, B extends number> = [...Build<A>, ...Build<B>]['length'];
expectTypeOf<Add<2, 3>>().toEqualTypeOf<5>(); // join two, read the length
type Subtract<A extends number, B extends number> = Build<A> extends [...Build<B>, ...infer Rest] ? Rest['length'] : never;
expectTypeOf<Subtract<7, 3>>().toEqualTypeOf<4>(); // take one off the other
expectTypeOf<Subtract<3, 7>>().toEqualTypeOf<never>(); // no negative numbers here
