assert.equal(1 / 0, Infinity, 'dividing by zero');
assert.equal(-1 / 0, -Infinity, 'from the other side');
assert.equal(typeof NaN, 'number', 'not a number is a number');
assert.equal(Number.isNaN(0 / 0), true, '0 / 0 makes no sense');
assert.equal(Number.isNaN('hello'), false, 'Number.isNaN only says yes to NaN itself');
assert.equal(isNaN('hello'), true, 'the old global isNaN converts first');
assert.equal(Number.isInteger(5.0), true, '5.0 is the same number as 5');
