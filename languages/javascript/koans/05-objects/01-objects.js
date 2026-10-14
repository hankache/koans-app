// title: Objects
// intro: An object maps names to values. Read a property with a dot or with brackets; reading one that isn't there gives `undefined`.
const ada = { name: 'Ada', born: 1815 };
assert.equal(ada.name, ___, 'a dot reads a property');
assert.equal(ada['born'], ___, 'so do brackets, with the name as a string');
assert.equal(ada.age, ___, 'a missing property is undefined');
ada.age = 36;
assert.deepEqual(Object.keys(ada), ___, 'keys keep the order they were added in');
assert.equal('name' in ada, ___, 'in asks whether a property exists');
delete ada.born;
assert.deepEqual(ada, ___, 'delete removes a property');
