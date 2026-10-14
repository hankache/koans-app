const x = 1;
const y = 2;
expect({ x, y }, 'shorthand properties').toEqual({ x: 1, y: 2 });
const field = 'color';
expect({ [field]: 'red' }, 'a computed key').toEqual({ color: 'red' });
expect({ [`${field}2`]: 'blue' }, 'any expression can name a key').toHaveProperty('color2');
const counter = { count: 0, increment() { return ++this.count; } };
counter.increment();
expect(counter.increment(), 'a shorthand method').toBe(2);
