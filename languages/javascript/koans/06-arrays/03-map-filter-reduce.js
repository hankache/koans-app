// title: Map, filter and reduce
// intro: `map` transforms every item, `filter` keeps some of them, and `reduce` combines them into one value. Each returns something new.
expect([1, 2, 3].map(n => n * 2), 'map transforms each item').toEqual(___);
expect([1, 2, 3, 4].filter(n => n % 2 === 0), 'filter keeps some').toEqual(___);
expect([1, 2, 3, 4].reduce((sum, n) => sum + n, 0), 'reduce combines them').toBe(___);
expect(['a', 'b'].map((x, i) => x + i), 'map also passes the index').toEqual(___);
expect(['a', 'b', 'a'].reduce((counts, x) => ({ ...counts, [x]: (counts[x] ?? 0) + 1 }), {}), 'reduce can build an object').toEqual(___);
