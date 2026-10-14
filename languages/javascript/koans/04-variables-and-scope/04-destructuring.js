// title: Destructuring
// intro: Destructuring takes values out of objects and arrays into variables in one step, with defaults for what's missing, renaming, and `...` for the rest.
const { name, age = 0 } = { name: 'Ada' };
expect(name, 'take a property by its name').toBe(___);
expect(age, 'with a default when it is missing').toBe(___);
const { city: town } = { city: 'London' };
expect(town, 'rename as you take it').toBe(___);
const [first, , third] = [1, 2, 3];
expect(third, 'take array items by position, skipping some').toBe(___);
const [head, ...tail] = [1, 2, 3];
expect(tail, '...tail takes the rest').toEqual(___);
const { user: { id } } = { user: { id: 7 } };
expect(id, 'destructuring nests').toBe(___);
