assert.equal(7 + 3, 10, 'addition');
assert.equal(7 - 10, -3, 'subtraction');
assert.equal(7 * 3, 21, 'multiplication');
assert.equal(2 ** 10, 1024, 'a power');
assert.equal(7 / 2, 3.5, '/ divides exactly');
assert.equal(Math.trunc(7 / 2), 3, 'Math.trunc drops the fraction');
assert.equal(7 % 3, 1, '% is the remainder');
assert.equal(-7 % 3, -1, 'it keeps the sign of the left side');
