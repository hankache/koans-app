// title: Special numbers
// intro: Dividing by zero gives `Infinity`, and a calculation that makes no sense gives `NaN`, "not a number", which is still a number.
assert.equal(1 / 0, ___, 'dividing by zero');
assert.equal(-1 / 0, ___, 'from the other side');
assert.equal(typeof NaN, ___, 'not a number is a number');
assert.equal(Number.isNaN(0 / 0), ___, '0 / 0 makes no sense');
assert.equal(Number.isNaN('hello'), ___, 'Number.isNaN only says yes to NaN itself');
assert.equal(isNaN('hello'), ___, 'the old global isNaN converts first');
assert.equal(Number.isInteger(5.0), ___, '5.0 is the same number as 5');
