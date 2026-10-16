const people = [{ name: 'Ada', age: 36 }, { name: 'Alan', age: 41 }, { name: 'Grace', age: 85 }];
expect(people.find(p => p.age > 40).name, 'find returns the first match').toBe('Alan');
expect(people.findLast(p => p.age > 40).name, 'findLast the last').toBe('Grace');
expect(people.findIndex(p => p.name === 'Ada'), 'findIndex returns its position').toBe(0);
expect(people.some(p => p.age > 80), 'some: does any pass?').toBe(true);
expect(people.every(p => p.age > 40), 'every: do all pass?').toBe(false);
expect([1, 2, 3], 'toContain looks for an item').toContain(2);
