const secret = Symbol('secret');
const obj = { a: 1, [secret]: 2 };
Object.defineProperty(obj, 'hidden', { value: 3, enumerable: false });
expect(Object.keys(obj), 'Object.keys sees enumerable string keys').toEqual(['a']);
expect(Reflect.ownKeys(obj), 'Reflect.ownKeys sees them all').toEqual(['a', 'hidden', secret]);
expect(Reflect.has(obj, 'hidden'), 'Reflect.has is the in operator').toBe(true);
expect(Reflect.apply(Math.max, null, [1, 5, 2]), 'Reflect.apply calls a function').toBe(5);
const frozen = Object.freeze({ x: 1 });
expect(Reflect.set(frozen, 'x', 2), 'Reflect.set reports failure instead of throwing').toBe(false);
const logged = [];
const watched = new Proxy({ x: 1 }, {
  get(o, key, receiver) {
    logged.push(key);
    return Reflect.get(o, key, receiver);
  },
});
expect(watched.x, 'a trap can log, then do the default').toBe(1);
expect(logged, 'what it logged').toEqual(['x']);
