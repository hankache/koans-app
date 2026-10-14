const prices = { tea: 3, cake: 5 };
expect(Object.keys(prices), 'the keys').toEqual(['tea', 'cake']);
expect(Object.values(prices), 'the values').toEqual([3, 5]);
expect(Object.entries(prices), 'key-value pairs').toEqual([['tea', 3], ['cake', 5]]);
expect(Object.fromEntries(Object.entries(prices).map(([k, v]) => [k, v * 2])), 'transform and rebuild').toEqual({ tea: 6, cake: 10 });
expect(Object.assign({}, { a: 1 }, { b: 2 }), 'assign copies properties into the first').toEqual({ a: 1, b: 2 });
expect(Object.hasOwn(prices, 'tea'), 'Object.hasOwn asks about own properties').toBe(true);
