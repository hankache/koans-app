expect(Array.from({ length: 3 }, (_, i) => i * 2), 'Array.from with a function').toEqual([0, 2, 4]);
expect(Array.from('abc'), 'from a string').toEqual(['a', 'b', 'c']);
expect(Array(3).fill(0), 'fill sets every item').toEqual([0, 0, 0]);
expect(Array.of(7), 'Array.of makes an array of its arguments').toEqual([7]);
expect([1, [2, [3, [4]]]].flat(Infinity), 'flat removes nesting').toEqual([1, 2, 3, 4]);
expect([1, 2].flatMap(n => [n, n * 10]), 'flatMap maps, then flattens').toEqual([1, 10, 2, 20]);
