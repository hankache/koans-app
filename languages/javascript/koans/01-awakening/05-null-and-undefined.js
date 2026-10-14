// title: null and undefined
// intro: `undefined` is what you get when nothing was assigned; `null` is a value meaning "nothing" on purpose.
let notYet;
expect(notYet, 'a declared variable starts undefined').toBe(___);
expect({}.missing, 'so does a missing property').toBe(___);
expect([1, 2][5], 'and an index past the end').toBe(___);
expect(null, 'null is set on purpose').toBe(___);
expect(typeof undefined === typeof null, 'their types differ').toBe(___);
expect(null ?? 'fallback', '?? replaces null and undefined').toBe(___);
