const primes: number[] = [2, 3, 5];
expectTypeOf(primes).toEqualTypeOf<Array<number>>(); // two ways to write the same type
expectTypeOf(primes[10]).toEqualTypeOf<number>(); // an index reads as the item type
expect(primes[10], 'though there may be nothing there').toBe(undefined);
expectTypeOf(primes.at(10)).toEqualTypeOf<number | undefined>(); // at() admits it
expectTypeOf(primes).items.toEqualTypeOf<number>(); // .items: an array's item type
