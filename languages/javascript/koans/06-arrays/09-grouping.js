// title: Grouping
// intro: `Object.groupBy(items, fn)` sorts items into an object of arrays, keyed by what `fn` returns. `Map.groupBy` does the same into a `Map`, so keys can be anything.
const words = ['apple', 'avocado', 'banana', 'blueberry', 'cherry'];
const byLetter = Object.groupBy(words, w => w[0]);
expect(byLetter.a, 'each key gets an array').toEqual(___);
expect(Object.keys(byLetter), 'keys in the order they first appear').toEqual(___);
const nums = [1, 2, 3, 4, 5];
const parity = Object.groupBy(nums, n => (n % 2 ? 'odd' : 'even'));
expect(parity.even, 'any key you like').toEqual(___);
const bySize = Map.groupBy(nums, n => n > 3);
expect(bySize.get(true), 'Map.groupBy keys can be booleans').toEqual(___);
expect(Object.getPrototypeOf(byLetter), 'the object has no prototype').toBe(___);
