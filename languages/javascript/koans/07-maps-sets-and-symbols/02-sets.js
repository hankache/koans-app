// title: Sets
// intro: A `Set` holds each value once, in the order it was first added, and answers `has` quickly.
const s = new Set([1, 1, 2, 3]);
expect(s.size, 'duplicates collapse').toBe(___);
expect(s.has(2), 'has asks for a value').toBe(___);
s.delete(1);
expect([...s], 'delete removes one').toEqual(___);
expect([...new Set('hello')], 'a set of the letters, in order').toEqual(___);
expect([...new Set([3, 1, 3, 2, 1])], 'a quick way to drop duplicates').toEqual(___);
