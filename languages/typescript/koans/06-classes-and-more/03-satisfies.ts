// title: satisfies
// intro: An annotation gives a value the declared type. `satisfies` checks the value against a type but lets it keep its own, more exact type.
type Palette = Record<string, string | number[]>;
const annotated: Palette = { red: [255, 0, 0] };
assert.type<___>(annotated.red, 'an annotation gives the declared type');
const checked = { red: [255, 0, 0], green: '#00ff00' } satisfies Palette;
assert.type<___>(checked.red, 'satisfies keeps the exact type');
assert.type<___>(checked.green, 'property by property');
assert.equal(checked.green.toUpperCase(), ___, 'so string methods are allowed');
