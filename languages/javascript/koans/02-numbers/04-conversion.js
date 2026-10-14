// title: Conversion
// intro: `Number()` converts a whole string or gives `NaN`; `parseInt` and `parseFloat` read as far as they can. Operators convert too: `+` prefers strings, the others prefer numbers.
assert.equal(Number('42'), ___, 'a string of digits');
assert.equal(Number(''), ___, 'the empty string is zero');
assert.equal(Number('42px'), ___, 'Number wants the whole string');
assert.equal(parseInt('42px'), ___, 'parseInt reads as far as it can');
assert.equal(parseFloat('3.5kg'), ___, 'and so does parseFloat');
assert.equal((255).toString(16), ___, 'toString takes a base');
assert.equal(parseInt('ff', 16), ___, 'and so does parseInt');
assert.equal('5' * '2', ___, '* converts strings to numbers');
assert.equal('5' + 2, ___, 'but + joins strings');
