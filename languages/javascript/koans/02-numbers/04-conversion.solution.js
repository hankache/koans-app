expect(Number('42'), 'a string of digits').toBe(42);
expect(Number(''), 'the empty string is zero').toBe(0);
expect(Number('42px'), 'Number wants the whole string').toBe(NaN);
expect(parseInt('42px'), 'parseInt reads as far as it can').toBe(42);
expect(parseFloat('3.5kg'), 'and so does parseFloat').toBe(3.5);
expect((255).toString(16), 'toString takes a base').toBe('ff');
expect('5' * '2', '* converts strings to numbers').toBe(10);
expect('5' + 2, 'but + joins strings').toBe('52');
