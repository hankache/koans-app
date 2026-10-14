// title: Special numbers
// intro: Dividing by zero gives `Infinity`, and a calculation that makes no sense gives `NaN`, "not a number", which is still a number.
expect(1 / 0, 'dividing by zero').toBe(___);
expect(-1 / 0, 'from the other side').toBe(___);
expect(typeof NaN, 'not a number is a number').toBe(___);
expect(0 / 0, '0 / 0 makes no sense').toBe(___);
expect(Number.isNaN('hello'), 'Number.isNaN only says yes to NaN itself').toBe(___);
expect(isNaN('hello'), 'the old global isNaN converts first').toBe(___);
expect(Object.is(-0, 0), '-0 and 0 are different to Object.is').toBe(___);
