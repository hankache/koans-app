// title: Map, filter and reduce
// intro: `map` transforms every item, `filter` keeps some of them, and `reduce` combines them into one value. Each returns something new.
assert.deepEqual([1, 2, 3].map(n => n * 2), ___, 'map transforms each item');
assert.deepEqual([1, 2, 3, 4].filter(n => n % 2 === 0), ___, 'filter keeps some');
assert.equal([1, 2, 3, 4].reduce((sum, n) => sum + n, 0), ___, 'reduce combines them');
assert.deepEqual(['a', 'b'].map((x, i) => x + i), ___, 'map also passes the index');
assert.deepEqual([[1, 2], [3]].flat(), ___, 'flat removes one level of nesting');
assert.deepEqual([1, 2].flatMap(n => [n, n * 10]), ___, 'flatMap maps, then flattens');
