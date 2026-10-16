let total = 0;
for (const n of [1, 2, 3]) {
  total += n;
}
expect(total, 'for...of walks the values').toBe(6);
expect([...['a', 'b'].entries()], 'entries pairs indexes with values').toEqual([[0, 'a'], [1, 'b']]);
expect([...['a', 'b'].keys()], 'keys gives the indexes').toEqual([0, 1]);
const seen = [];
['x', 'y'].forEach((item, i) => seen.push(`${i}:${item}`));
expect(seen, 'forEach calls a function for each item').toEqual(['0:x', '1:y']);
