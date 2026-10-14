// title: Searching
// intro: `find` returns the first item a test accepts, `findIndex` its position, and `some` and `every` ask whether any or all of them pass.
const people = [{ name: 'Ada', age: 36 }, { name: 'Alan', age: 41 }];
assert.equal(people.find(p => p.age > 40).name, ___, 'find returns the first match');
assert.equal(people.findIndex(p => p.name === 'Ada'), ___, 'findIndex returns its position');
assert.equal(people.some(p => p.age > 40), ___, 'some: does any pass?');
assert.equal(people.every(p => p.age > 40), ___, 'every: do all pass?');
assert.equal(people.find(p => p.age > 100), ___, 'find gives undefined when nothing matches');
