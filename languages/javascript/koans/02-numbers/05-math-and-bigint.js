// title: Math and BigInt
// intro: `Math` holds the usual functions. `BigInt` numbers, written with an `n`, are integers of any size, and don't mix with ordinary numbers.
assert.equal(Math.max(3, 7, 1), ___, 'the largest');
assert.equal(Math.round(2.5), ___, 'Math.round rounds halves up');
assert.equal(Math.round(-2.5), ___, 'up, toward plus infinity');
assert.equal(Math.floor(-1.5), ___, 'floor rounds down');
assert.equal(2n ** 64n, ___, 'BigInts grow as large as needed');
assert.equal(typeof 10n, ___, 'a type of their own');
assert.throws(() => 1n + 1, ___, 'BigInts and numbers do not mix');
