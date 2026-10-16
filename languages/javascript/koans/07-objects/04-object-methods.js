// title: Object methods
// intro: `Object.keys`, `values` and `entries` turn an object into arrays; `Object.fromEntries` turns pairs back into an object; `Object.assign` copies properties into a target.
const prices = { tea: 3, cake: 5 };
expect(Object.keys(prices), 'the keys').toEqual(___);
expect(Object.values(prices), 'the values').toEqual(___);
expect(Object.entries(prices), 'key-value pairs').toEqual(___);
expect(Object.fromEntries(Object.entries(prices).map(([k, v]) => [k, v * 2])), 'transform and rebuild').toEqual(___);
expect(Object.assign({}, { a: 1 }, { b: 2 }), 'assign copies properties into the first').toEqual(___);
expect(Object.hasOwn(prices, 'tea'), 'Object.hasOwn asks about own properties').toBe(___);
