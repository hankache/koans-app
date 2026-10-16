// title: Proxies
// intro: A `Proxy` wraps an object and lets a handler step in on what's done to it: reading a property calls the `get` trap, writing calls `set`, `in` calls `has`.
const target = { name: 'Ada' };
const loud = new Proxy(target, {
  get: (obj, key) => (key in obj ? String(obj[key]).toUpperCase() : 'missing'),
});
expect(loud.name, 'get steps in on reading').toBe(___);
expect(loud.age, 'even for missing properties').toBe(___);
const positive = new Proxy({}, {
  set(obj, key, value) {
    if (value < 0) throw new RangeError(`${key} must be positive`);
    obj[key] = value;
    return true;
  },
});
positive.count = 3;
expect(positive.count, 'set can let a value through').toBe(___);
expect(() => { positive.count = -1; }, 'or refuse it').toThrow(___);
const range = new Proxy({}, { has: (obj, key) => Number(key) >= 1 && Number(key) <= 10 });
expect(5 in range, 'has decides what in says').toBe(___);
expect(loud === target, 'the proxy is a different object').toBe(___);
