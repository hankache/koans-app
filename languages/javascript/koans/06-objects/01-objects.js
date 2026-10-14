// title: Objects
// intro: An object maps names to values. Read a property with a dot or with brackets; reading one that isn't there gives `undefined`, and `delete` removes one.
const ada = { name: 'Ada', born: 1815 };
expect(ada.name, 'a dot reads a property').toBe(___);
expect(ada['born'], 'so do brackets, with the name as a string').toBe(___);
expect(ada.age, 'a missing property is undefined').toBe(___);
ada.age = 36;
expect(ada, 'toHaveProperty asks for a property').toHaveProperty(___);
delete ada.born;
expect(ada, 'delete removed born').toEqual(___);
