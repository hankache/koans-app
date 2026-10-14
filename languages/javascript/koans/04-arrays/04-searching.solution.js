const people = [{ name: 'Ada', age: 36 }, { name: 'Alan', age: 41 }];
assert.equal(people.find(p => p.age > 40).name, 'Alan', 'find returns the first match');
assert.equal(people.findIndex(p => p.name === 'Ada'), 0, 'findIndex returns its position');
assert.equal(people.some(p => p.age > 40), true, 'some: does any pass?');
assert.equal(people.every(p => p.age > 40), false, 'every: do all pass?');
assert.equal(people.find(p => p.age > 100), undefined, 'find gives undefined when nothing matches');
