expect(0.1 + 0.2, 'floats are approximations').toBe(0.30000000000000004);
expect(0.1 + 0.2, 'toBeCloseTo allows for that').toBeCloseTo(0.3);
expect((0.1 + 0.2).toFixed(2), 'toFixed rounds to a string').toBe('0.30');
expect(Number.MAX_SAFE_INTEGER, '2 ** 53 - 1').toBe(9007199254740991);
expect(2 ** 53 + 1 === 2 ** 53, 'past it, integers lose precision').toBe(true);
expect(Number.isSafeInteger(2 ** 53), 'Number.isSafeInteger knows').toBe(false);
