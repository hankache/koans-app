assert.equal(0.1 + 0.2, 0.30000000000000004, 'floats are approximations');
assert.equal(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON, true, 'so compare them with a tolerance');
assert.equal((0.1 + 0.2).toFixed(2), '0.30', 'toFixed rounds to a string');
assert.equal(Number.MAX_SAFE_INTEGER, 9007199254740991, '2 ** 53 - 1');
assert.equal(2 ** 53 + 1 === 2 ** 53, true, 'past it, integers lose precision');
