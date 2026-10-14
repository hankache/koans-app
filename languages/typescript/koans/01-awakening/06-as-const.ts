// title: as const
// intro: `as const` makes TypeScript infer the narrowest type it can: literal values, readonly properties, and arrays as fixed tuples.
const loose = { mode: 'dark', size: 12 };
expectTypeOf(loose.mode).toEqualTypeOf<___>(); // object properties widen
const fixed = { mode: 'dark', size: 12 } as const;
expectTypeOf(fixed.mode).toEqualTypeOf<___>(); // as const keeps them literal
expectTypeOf(fixed).toEqualTypeOf<___>(); // and readonly
const pair = [1, 'a'] as const;
expectTypeOf(pair).toEqualTypeOf<___>(); // an array becomes a tuple
expect(pair.length, 'nothing changes at run time').toBe(___);
