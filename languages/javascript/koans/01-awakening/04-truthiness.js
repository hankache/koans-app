// title: Truthiness
// intro: Any value can stand in for a boolean. `false`, `0`, `''`, `null`, `undefined` and `NaN` are falsy; everything else is truthy. `||` picks the first truthy value; `??` only skips `null` and `undefined`.
assert.equal(Boolean(0), ___, 'zero is falsy');
assert.equal(Boolean(''), ___, 'so is the empty string');
assert.equal(Boolean('0'), ___, 'a string with something in it is truthy');
assert.equal(Boolean([]), ___, 'an empty array is truthy');
assert.equal(Boolean(null), ___, 'null is falsy');
assert.equal(0 || 'default', ___, '|| skips any falsy value');
assert.equal(0 ?? 'default', ___, '?? only skips null and undefined');
