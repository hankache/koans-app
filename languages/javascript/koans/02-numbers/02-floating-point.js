// title: Floating point
// intro: Every number is a 64-bit float. Integers are exact up to `Number.MAX_SAFE_INTEGER`; fractions like `0.1` are binary approximations, which `toBeCloseTo` allows for.
expect(0.1 + 0.2, 'floats are approximations').toBe(___);
expect(0.1 + 0.2, 'toBeCloseTo allows for that').toBeCloseTo(___);
expect((0.1 + 0.2).toFixed(2), 'toFixed rounds to a string').toBe(___);
expect(Number.MAX_SAFE_INTEGER, '2 ** 53 - 1').toBe(___);
expect(2 ** 53 + 1 === 2 ** 53, 'past it, integers lose precision').toBe(___);
expect(Number.isSafeInteger(2 ** 53), 'Number.isSafeInteger knows').toBe(___);
