// title: Floating point
// intro: Every number is a 64-bit float. Integers are exact up to `Number.MAX_SAFE_INTEGER`; fractions like `0.1` are binary approximations.
assert.equal(0.1 + 0.2, ___, 'floats are approximations');
assert.equal(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON, ___, 'so compare them with a tolerance');
assert.equal((0.1 + 0.2).toFixed(2), ___, 'toFixed rounds to a string');
assert.equal(Number.MAX_SAFE_INTEGER, ___, '2 ** 53 - 1');
assert.equal(2 ** 53 + 1 === 2 ** 53, ___, 'past it, integers lose precision');
