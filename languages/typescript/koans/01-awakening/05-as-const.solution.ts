const colors = ['red', 'green'] as const;
assert.type<readonly ['red', 'green']>(colors, 'an array becomes a readonly tuple');
assert.equal(colors.length, 2, 'and is still an array when the code runs');
const config = { mode: 'dark' } as const;
assert.type<{ readonly mode: 'dark' }>(config, 'properties keep their exact values');
const plain = { mode: 'dark' };
assert.type<{ mode: string }>(plain, 'without as const, they widen');
type Color = (typeof colors)[number];
assert.typeEqual<Color, 'red' | 'green'>('its items, as a union');
