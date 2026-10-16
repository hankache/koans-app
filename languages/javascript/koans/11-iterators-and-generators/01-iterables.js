// title: Iterables
// intro: Anything with a `Symbol.iterator` method is iterable: arrays, strings, Maps and Sets. Its iterator's `next()` returns `{ value, done }`.
const it = [10, 20][Symbol.iterator]();
expect(it.next(), 'next gives the first value').toEqual(___);
expect(it.next().value, 'then the next').toBe(___);
expect(it.next().done, 'and then says it is done').toBe(___);
expect([...new Map([['a', 1]])], 'a Map iterates over its entries').toEqual(___);
expect(typeof {}[Symbol.iterator], 'a plain object is not iterable').toBe(___);
