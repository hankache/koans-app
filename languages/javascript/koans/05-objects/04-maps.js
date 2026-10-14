// title: Maps
// intro: A `Map` maps keys to values like an object, but any value can be a key, it knows its size, and it keeps keys in the order they were added.
const ages = new Map([['Ada', 36]]);
assert.equal(ages.get('Ada'), ___, 'get a value by its key');
ages.set('Alan', 41);
assert.equal(ages.size, ___, 'set adds a key, and size counts them');
assert.equal(ages.has('Grace'), ___, 'has asks for a key');
assert.equal(ages.get('Grace'), ___, 'get gives undefined for a missing one');
assert.deepEqual([...ages.keys()], ___, 'keys come in the order they were added');
const key = {};
const labels = new Map([[key, 'an object as a key']]);
assert.equal(labels.get(key), ___, 'any value can be a key');
