const ada = { name: 'Ada', born: 1815 };
expect(ada.name, 'a dot reads a property').toBe('Ada');
expect(ada['born'], 'so do brackets, with the name as a string').toBe(1815);
expect(ada.age, 'a missing property is undefined').toBe(undefined);
ada.age = 36;
expect(ada, 'toHaveProperty asks for a property').toHaveProperty('age');
delete ada.born;
expect(ada, 'delete removed born').toEqual({ name: 'Ada', age: 36 });
