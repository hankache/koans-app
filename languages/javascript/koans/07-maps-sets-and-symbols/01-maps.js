// title: Maps
// intro: A `Map` maps keys to values like an object, but any value can be a key, it knows its size, and it keeps keys in the order they were added.
const ages = new Map([['Ada', 36]]);
expect(ages.get('Ada'), 'get a value by its key').toBe(___);
ages.set('Alan', 41);
expect(ages.size, 'set adds a key, and size counts them').toBe(___);
expect(ages.has('Grace'), 'has asks for a key').toBe(___);
expect([...ages.keys()], 'keys come in the order they were added').toEqual(___);
const key = {};
const labels = new Map([[key, 'an object as a key']]);
expect(labels.get(key), 'any value can be a key').toBe(___);
expect(Object.fromEntries(ages), 'a Map turns into an object').toEqual(___);
