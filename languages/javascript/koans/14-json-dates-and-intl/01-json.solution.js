expect(JSON.stringify({ a: 1, b: [true, null] }), 'stringify writes JSON').toBe('{"a":1,"b":[true,null]}');
expect(JSON.parse('{"x": [1, 2]}'), 'parse reads it').toEqual({ x: [1, 2] });
expect(JSON.stringify({ a: undefined, b: 1 }), 'undefined properties are left out').toBe('{"b":1}');
expect(JSON.stringify([undefined]), 'and become null in arrays').toBe('[null]');
expect(JSON.stringify({ when: new Date(0) }), 'dates become strings').toBe('{"when":"1970-01-01T00:00:00.000Z"}');
expect(JSON.stringify({ a: 1 }, null, 2), 'indentation for people').toBe('{\n  "a": 1\n}');
