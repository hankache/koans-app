assert.deepEqual([1, 2, 3].map(n => n * 2), [2, 4, 6], 'map transforms each item');
assert.deepEqual([1, 2, 3, 4].filter(n => n % 2 === 0), [2, 4], 'filter keeps some');
assert.equal([1, 2, 3, 4].reduce((sum, n) => sum + n, 0), 10, 'reduce combines them');
assert.deepEqual(['a', 'b'].map((x, i) => x + i), ['a0', 'b1'], 'map also passes the index');
assert.deepEqual([[1, 2], [3]].flat(), [1, 2, 3], 'flat removes one level of nesting');
assert.deepEqual([1, 2].flatMap(n => [n, n * 10]), [1, 10, 2, 20], 'flatMap maps, then flattens');
