// title: Reflect
// intro: `Reflect` has a function for each thing a proxy can step in on, doing the default. `Reflect.ownKeys` lists every own key, symbols and non-enumerable ones included.
const secret = Symbol('secret');
const obj = { a: 1, [secret]: 2 };
Object.defineProperty(obj, 'hidden', { value: 3, enumerable: false });
expect(Object.keys(obj), 'Object.keys sees enumerable string keys').toEqual(___);
expect(Reflect.ownKeys(obj), 'Reflect.ownKeys sees them all').toEqual(___);
expect(Reflect.has(obj, 'hidden'), 'Reflect.has is the in operator').toBe(___);
expect(Reflect.apply(Math.max, null, [1, 5, 2]), 'Reflect.apply calls a function').toBe(___);
const frozen = Object.freeze({ x: 1 });
expect(Reflect.set(frozen, 'x', 2), 'Reflect.set reports failure instead of throwing').toBe(___);
const logged = [];
const watched = new Proxy({ x: 1 }, {
  get(o, key, receiver) {
    logged.push(key);
    return Reflect.get(o, key, receiver);
  },
});
expect(watched.x, 'a trap can log, then do the default').toBe(___);
expect(logged, 'what it logged').toEqual(___);
