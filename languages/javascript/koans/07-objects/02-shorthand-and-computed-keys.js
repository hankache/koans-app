// title: Shorthand and computed keys
// intro: When a property and a variable share a name, write it once. Brackets around a key compute its name, and methods can be written without `function`.
const x = 1;
const y = 2;
expect({ x, y }, 'shorthand properties').toEqual(___);
const field = 'color';
expect({ [field]: 'red' }, 'a computed key').toEqual(___);
expect({ [`${field}2`]: 'blue' }, 'any expression can name a key').toHaveProperty(___);
const counter = { count: 0, increment() { return ++this.count; } };
counter.increment();
expect(counter.increment(), 'a shorthand method').toBe(___);
