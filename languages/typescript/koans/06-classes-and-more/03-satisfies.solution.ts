type Palette = Record<string, string | number[]>;
const annotated: Palette = { red: [255, 0, 0] };
assert.type<string | number[]>(annotated.red, 'an annotation gives the declared type');
const checked = { red: [255, 0, 0], green: '#00ff00' } satisfies Palette;
assert.type<number[]>(checked.red, 'satisfies keeps the exact type');
assert.type<string>(checked.green, 'property by property');
assert.equal(checked.green.toUpperCase(), '#00FF00', 'so string methods are allowed');
