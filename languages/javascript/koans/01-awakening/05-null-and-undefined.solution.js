let notYet;
expect(notYet, 'a declared variable starts undefined').toBe(undefined);
expect({}.missing, 'so does a missing property').toBe(undefined);
expect([1, 2][5], 'and an index past the end').toBe(undefined);
expect(null, 'null is set on purpose').toBe(null);
expect(typeof undefined === typeof null, 'their types differ').toBe(false);
expect(null ?? 'fallback', '?? replaces null and undefined').toBe('fallback');
