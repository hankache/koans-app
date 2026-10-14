// title: Symbols
// intro: A `Symbol` is a unique value, often used as a property key that can't clash with others. `Symbol.for` gives a shared symbol for a name.
const id = Symbol('id');
expect(id === Symbol('id'), 'every symbol is unique').toBe(___);
expect(id.description, 'it keeps its description').toBe(___);
const user = { name: 'Ada', [id]: 7 };
expect(user[id], 'a symbol can be a key').toBe(___);
expect(Object.keys(user), 'Object.keys leaves symbol keys out').toEqual(___);
expect(Symbol.for('app') === Symbol.for('app'), 'Symbol.for shares one per name').toBe(___);
