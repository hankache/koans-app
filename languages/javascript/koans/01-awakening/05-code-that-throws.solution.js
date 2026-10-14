assert.throws(() => null.length, TypeError, 'null has no properties');
assert.throws(() => notDeclared, ReferenceError, 'a name nobody declared');
assert.throws(() => new Array(-1), RangeError, 'an array cannot have a negative length');
assert.throws(() => JSON.parse('{bad'), SyntaxError, 'JSON.parse wants valid JSON');
assert.throws(() => { throw new Error('custom message'); }, /custom/, 'a regular expression checks the message');
