// title: BigInt
// intro: `BigInt` numbers, written with an `n`, are integers of any size. They don't mix with ordinary numbers, and their division drops the fraction.
expect(2n ** 64n, 'BigInts grow as large as needed').toBe(___);
expect(typeof 10n, 'a type of their own').toBe(___);
expect(7n / 2n, 'BigInt division drops the fraction').toBe(___);
expect(() => 1n + 1, 'BigInts and numbers do not mix').toThrow(___);
expect(BigInt(10) === 10n, 'BigInt() converts a number').toBe(___);
expect(10n == 10, 'loose equality works across them').toBe(___);
