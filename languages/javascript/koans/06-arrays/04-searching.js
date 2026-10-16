// title: Searching
// intro: `find` returns the first item a test accepts and `findLast` the last; `findIndex` gives a position, and `some` and `every` ask whether any or all of them pass.
const people = [{ name: 'Ada', age: 36 }, { name: 'Alan', age: 41 }, { name: 'Grace', age: 85 }];
expect(people.find(p => p.age > 40).name, 'find returns the first match').toBe(___);
expect(people.findLast(p => p.age > 40).name, 'findLast the last').toBe(___);
expect(people.findIndex(p => p.name === 'Ada'), 'findIndex returns its position').toBe(___);
expect(people.some(p => p.age > 80), 'some: does any pass?').toBe(___);
expect(people.every(p => p.age > 40), 'every: do all pass?').toBe(___);
expect([1, 2, 3], 'toContain looks for an item').toContain(___);
