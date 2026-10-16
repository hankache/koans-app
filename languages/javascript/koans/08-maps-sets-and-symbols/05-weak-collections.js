// title: Weak collections
// intro: A `WeakMap` or `WeakSet` holds its keys weakly: once nothing else refers to a key, it can be collected. So the keys must be objects, and there is no size or iteration.
const metadata = new WeakMap();
const user = { name: 'Ada' };
metadata.set(user, { visits: 3 });
expect(metadata.get(user), 'a WeakMap attaches data to an object').toEqual(___);
expect(() => metadata.set('name', 1), 'keys must be objects').toThrow(___);
expect(metadata.size, 'it has no size').toBe(___);
const seen = new WeakSet([user]);
expect(seen.has(user), 'a WeakSet remembers objects').toBe(___);
expect(seen.has({ name: 'Ada' }), 'by identity, not by contents').toBe(___);
const ref = new WeakRef(user);
expect(ref.deref(), 'a WeakRef gives the object back while it lives').toBe(___);
