const loose = { mode: 'dark', size: 12 };
expectTypeOf(loose.mode).toEqualTypeOf<string>(); // object properties widen
const fixed = { mode: 'dark', size: 12 } as const;
expectTypeOf(fixed.mode).toEqualTypeOf<'dark'>(); // as const keeps them literal
expectTypeOf(fixed).toEqualTypeOf<{ readonly mode: 'dark'; readonly size: 12 }>(); // and readonly
const pair = [1, 'a'] as const;
expectTypeOf(pair).toEqualTypeOf<readonly [1, 'a']>(); // an array becomes a tuple
expect(pair.length, 'nothing changes at run time').toBe(2);
