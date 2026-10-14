expect(2n ** 64n, 'BigInts grow as large as needed').toBe(18446744073709551616n);
expect(typeof 10n, 'a type of their own').toBe('bigint');
expect(7n / 2n, 'BigInt division drops the fraction').toBe(3n);
expect(() => 1n + 1, 'BigInts and numbers do not mix').toThrow(TypeError);
expect(BigInt(10) === 10n, 'BigInt() converts a number').toBe(true);
expect(10n == 10, 'loose equality works across them').toBe(true);
