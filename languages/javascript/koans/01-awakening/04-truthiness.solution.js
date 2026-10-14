assert.equal(Boolean(0), false, 'zero is falsy');
assert.equal(Boolean(''), false, 'so is the empty string');
assert.equal(Boolean('0'), true, 'a string with something in it is truthy');
assert.equal(Boolean([]), true, 'an empty array is truthy');
assert.equal(Boolean(null), false, 'null is falsy');
assert.equal(0 || 'default', 'default', '|| skips any falsy value');
assert.equal(0 ?? 'default', 0, '?? only skips null and undefined');
