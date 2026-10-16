const id = Symbol('id');
expect(id === Symbol('id'), 'every symbol is unique').toBe(false);
expect(id.description, 'it keeps its description').toBe('id');
const user = { name: 'Ada', [id]: 7 };
expect(user[id], 'a symbol can be a key').toBe(7);
expect(Object.keys(user), 'Object.keys leaves symbol keys out').toEqual(['name']);
expect(Symbol.for('app') === Symbol.for('app'), 'Symbol.for shares one per name').toBe(true);
