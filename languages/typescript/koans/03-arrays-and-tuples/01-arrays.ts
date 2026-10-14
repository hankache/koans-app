// title: Arrays
// intro: `T[]` and `Array<T>` are the same type. Reading an index gives a `T`, even past the end, unless the compiler is told to be stricter.
const primes: number[] = [2, 3, 5];
expectTypeOf(primes).toEqualTypeOf<___>(); // two ways to write the same type
expectTypeOf(primes[10]).toEqualTypeOf<___>(); // an index reads as the item type
expect(primes[10], 'though there may be nothing there').toBe(___);
expectTypeOf(primes.at(10)).toEqualTypeOf<___>(); // at() admits it
expectTypeOf(primes).items.toEqualTypeOf<___>(); // .items: an array's item type
