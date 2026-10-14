// title: as const
// intro: `as const` makes a value's type as exact as it can be: literal types, readonly properties, and arrays that become readonly tuples.
const colors = ['red', 'green'] as const;
assert.type<___>(colors, 'an array becomes a readonly tuple');
assert.equal(colors.length, ___, 'and is still an array when the code runs');
const config = { mode: 'dark' } as const;
assert.type<___>(config, 'properties keep their exact values');
const plain = { mode: 'dark' };
assert.type<___>(plain, 'without as const, they widen');
type Color = (typeof colors)[number];
assert.typeEqual<Color, ___>('its items, as a union');
