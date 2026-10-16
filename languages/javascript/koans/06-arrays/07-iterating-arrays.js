// title: Iterating arrays
// intro: `for…of` walks the values, `entries()` gives index-value pairs, and `forEach` calls a function for each item.
let total = 0;
for (const n of [1, 2, 3]) {
  total += n;
}
expect(total, 'for...of walks the values').toBe(___);
expect([...['a', 'b'].entries()], 'entries pairs indexes with values').toEqual(___);
expect([...['a', 'b'].keys()], 'keys gives the indexes').toEqual(___);
const seen = [];
['x', 'y'].forEach((item, i) => seen.push(`${i}:${item}`));
expect(seen, 'forEach calls a function for each item').toEqual(___);
