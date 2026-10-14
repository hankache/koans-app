assert.equal(Number('42'), 42, 'a string of digits');
assert.equal(Number(''), 0, 'the empty string is zero');
assert.equal(Number('42px'), NaN, 'Number wants the whole string');
assert.equal(parseInt('42px'), 42, 'parseInt reads as far as it can');
assert.equal(parseFloat('3.5kg'), 3.5, 'and so does parseFloat');
assert.equal((255).toString(16), 'ff', 'toString takes a base');
assert.equal(parseInt('ff', 16), 255, 'and so does parseInt');
assert.equal('5' * '2', 10, '* converts strings to numbers');
assert.equal('5' + 2, '52', 'but + joins strings');
