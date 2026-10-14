// title: JSON
// intro: `JSON.stringify` turns values into JSON text and `JSON.parse` reads it back. Some values don't survive the trip.
expect(JSON.stringify({ a: 1, b: [true, null] }), 'stringify writes JSON').toBe(___);
expect(JSON.parse('{"x": [1, 2]}'), 'parse reads it').toEqual(___);
expect(JSON.stringify({ a: undefined, b: 1 }), 'undefined properties are left out').toBe(___);
expect(JSON.stringify([undefined]), 'and become null in arrays').toBe(___);
expect(JSON.stringify({ when: new Date(0) }), 'dates become strings').toBe(___);
expect(JSON.stringify({ a: 1 }, null, 2), 'indentation for people').toBe(___);
