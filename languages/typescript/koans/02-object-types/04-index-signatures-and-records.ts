// title: Index signatures and records
// intro: When the keys aren't known ahead, an index signature, `[key: string]: T`, or `Record<K, T>` types every property at once.
const scores: { [player: string]: number } = { ada: 3, alan: 5 };
scores.grace = 8;
expect(Object.keys(scores), 'any string key is allowed').toEqual(___);
expectTypeOf(scores.anyone).toEqualTypeOf<___>(); // every key reads as a number
const stock: Record<'tea' | 'cake', number> = { tea: 3, cake: 0 };
expectTypeOf(stock).toEqualTypeOf<___>(); // a Record with known keys
const sum = Object.values(stock).reduce((t, n) => t + n, 0);
expect(sum, 'add up the stock').toBe(___);
