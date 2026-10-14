const scores: { [player: string]: number } = { ada: 3, alan: 5 };
scores.grace = 8;
expect(Object.keys(scores), 'any string key is allowed').toEqual(['ada', 'alan', 'grace']);
expectTypeOf(scores.anyone).toEqualTypeOf<number>(); // every key reads as a number
const stock: Record<'tea' | 'cake', number> = { tea: 3, cake: 0 };
expectTypeOf(stock).toEqualTypeOf<{ tea: number; cake: number }>(); // a Record with known keys
const sum = Object.values(stock).reduce((t, n) => t + n, 0);
expect(sum, 'add up the stock').toBe(3);
