const ada = { name: 'Ada', born: 1815 };
assert.equal(ada.name, 'Ada', 'a dot reads a property');
assert.equal(ada['born'], 1815, 'so do brackets, with the name as a string');
assert.equal(ada.age, undefined, 'a missing property is undefined');
ada.age = 36;
assert.deepEqual(Object.keys(ada), ['name', 'born', 'age'], 'keys keep the order they were added in');
assert.equal('name' in ada, true, 'in asks whether a property exists');
delete ada.born;
assert.deepEqual(ada, { name: 'Ada', age: 36 }, 'delete removes a property');
