// title: Arithmetic
// intro: The usual operators, plus `**` for powers and `%` for the remainder. There is no integer division: `/` always divides exactly.
assert.equal(7 + 3, ___, 'addition');
assert.equal(7 - 10, ___, 'subtraction');
assert.equal(7 * 3, ___, 'multiplication');
assert.equal(2 ** 10, ___, 'a power');
assert.equal(7 / 2, ___, '/ divides exactly');
assert.equal(Math.trunc(7 / 2), ___, 'Math.trunc drops the fraction');
assert.equal(7 % 3, ___, '% is the remainder');
assert.equal(-7 % 3, ___, 'it keeps the sign of the left side');
