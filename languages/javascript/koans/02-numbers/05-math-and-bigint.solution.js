assert.equal(Math.max(3, 7, 1), 7, 'the largest');
assert.equal(Math.round(2.5), 3, 'Math.round rounds halves up');
assert.equal(Math.round(-2.5), -2, 'up, toward plus infinity');
assert.equal(Math.floor(-1.5), -2, 'floor rounds down');
assert.equal(2n ** 64n, 18446744073709551616n, 'BigInts grow as large as needed');
assert.equal(typeof 10n, 'bigint', 'a type of their own');
assert.throws(() => 1n + 1, TypeError, 'BigInts and numbers do not mix');
