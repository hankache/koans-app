expect(() => null.length, 'null has no properties').toThrow(TypeError);
expect(() => notDeclared, 'a name nobody declared').toThrow(ReferenceError);
expect(() => new Array(-1), 'an array cannot have a negative length').toThrow(RangeError);
expect(() => JSON.parse('{bad'), 'JSON.parse wants valid JSON').toThrow(SyntaxError);
expect(() => { throw new Error('custom message'); }, 'a string checks part of the message').toThrow('custom');
expect(() => 42, '.not.toThrow wants no error').not.toThrow();
expect(() => [].at(5), 'reading past the end does not throw').not.toThrow(Error);
