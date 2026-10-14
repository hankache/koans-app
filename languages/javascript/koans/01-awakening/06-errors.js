// title: Errors
// intro: `expect(fn).toThrow(…)` calls a function and wants it to throw: the error's class, a piece of its message, or a pattern its message matches.
expect(() => null.length, 'null has no properties').toThrow(___);
expect(() => notDeclared, 'a name nobody declared').toThrow(___);
expect(() => new Array(-1), 'an array cannot have a negative length').toThrow(___);
expect(() => JSON.parse('{bad'), 'JSON.parse wants valid JSON').toThrow(___);
expect(() => { throw new Error('custom message'); }, 'a string checks part of the message').toThrow(___);
expect(() => 42, '.not.toThrow wants no error').not.toThrow();
expect(() => [].at(5), 'reading past the end does not throw').not.toThrow(___);
