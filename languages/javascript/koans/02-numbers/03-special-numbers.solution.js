expect(1 / 0, 'dividing by zero').toBe(Infinity);
expect(-1 / 0, 'from the other side').toBe(-Infinity);
expect(typeof NaN, 'not a number is a number').toBe('number');
expect(0 / 0, '0 / 0 makes no sense').toBe(NaN);
expect(Number.isNaN('hello'), 'Number.isNaN only says yes to NaN itself').toBe(false);
expect(isNaN('hello'), 'the old global isNaN converts first').toBe(true);
expect(Object.is(-0, 0), '-0 and 0 are different to Object.is').toBe(false);
