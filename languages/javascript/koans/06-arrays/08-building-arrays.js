// title: Building arrays
// intro: `Array.from` builds an array from anything iterable or array-like, with an optional function for each item; `fill` and `flat` shape arrays too.
expect(Array.from({ length: 3 }, (_, i) => i * 2), 'Array.from with a function').toEqual(___);
expect(Array.from('abc'), 'from a string').toEqual(___);
expect(Array(3).fill(0), 'fill sets every item').toEqual(___);
expect(Array.of(7), 'Array.of makes an array of its arguments').toEqual(___);
expect([1, [2, [3, [4]]]].flat(Infinity), 'flat removes nesting').toEqual(___);
expect([1, 2].flatMap(n => [n, n * 10]), 'flatMap maps, then flattens').toEqual(___);
