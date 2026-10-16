expect([1, 2, 3].map(n => n * 2), 'map transforms each item').toEqual([2, 4, 6]);
expect([1, 2, 3, 4].filter(n => n % 2 === 0), 'filter keeps some').toEqual([2, 4]);
expect([1, 2, 3, 4].reduce((sum, n) => sum + n, 0), 'reduce combines them').toBe(10);
expect(['a', 'b'].map((x, i) => x + i), 'map also passes the index').toEqual(['a0', 'b1']);
expect(['a', 'b', 'a'].reduce((counts, x) => ({ ...counts, [x]: (counts[x] ?? 0) + 1 }), {}), 'reduce can build an object').toEqual({ a: 2, b: 1 });
