// title: Code that throws
// intro: `assert.throws` calls a function and wants it to throw. The second argument says what it should throw: an error class, or a regular expression its message must match.
assert.throws(() => null.length, ___, 'null has no properties');
assert.throws(() => notDeclared, ___, 'a name nobody declared');
assert.throws(() => new Array(-1), ___, 'an array cannot have a negative length');
assert.throws(() => JSON.parse('{bad'), ___, 'JSON.parse wants valid JSON');
assert.throws(() => { throw new Error('custom message'); }, ___, 'a regular expression checks the message');
