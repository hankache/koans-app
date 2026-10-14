// title: Conversion
// intro: `Number()` converts a whole string or gives `NaN`; `parseInt` and `parseFloat` read as far as they can. Operators convert too: `+` prefers strings, the others prefer numbers.
expect(Number('42'), 'a string of digits').toBe(___);
expect(Number(''), 'the empty string is zero').toBe(___);
expect(Number('42px'), 'Number wants the whole string').toBe(___);
expect(parseInt('42px'), 'parseInt reads as far as it can').toBe(___);
expect(parseFloat('3.5kg'), 'and so does parseFloat').toBe(___);
expect((255).toString(16), 'toString takes a base').toBe(___);
expect('5' * '2', '* converts strings to numbers').toBe(___);
expect('5' + 2, 'but + joins strings').toBe(___);
