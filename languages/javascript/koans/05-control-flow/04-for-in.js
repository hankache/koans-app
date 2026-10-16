// title: for…in
// intro: `for…in` walks an object's enumerable string keys, its own and inherited ones. Integer-like keys come first, in numeric order, then the others in the order they were added.
const keys = [];
for (const key in { b: 1, 2: 'two', a: 2, 1: 'one' }) keys.push(key);
expect(keys, 'integer keys first, then the rest in insertion order').toEqual(___);
const found = [];
for (const i in ['x', 'y']) found.push(i);
expect(found, 'on an array it gives indexes, as strings').toEqual(___);
const parent = { fromParent: true };
const child = Object.create(parent);
child.own = true;
const all = [];
for (const key in child) all.push(key);
expect(all, 'it includes inherited keys').toEqual(___);
expect(Object.keys(child), 'Object.keys has only its own').toEqual(___);
