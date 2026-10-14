// title: Array method types
// intro: Array methods know their types: `map` returns whatever its function returns, `find` might find nothing, and a `filter` whose test checks a type narrows the array.
const values = [1, 'two', 3, null];
expectTypeOf(values).toEqualTypeOf<___>(); // every kind of item
const numbers = values.filter(v => typeof v === 'number');
expectTypeOf(numbers).toEqualTypeOf<___>(); // a type test in filter narrows the result
expect(numbers, 'and here they are').toEqual(___);
const found = [1, 2, 3].find(n => n > 5);
expectTypeOf(found).toEqualTypeOf<___>(); // find may find nothing
expectTypeOf([1, 2].map(String)).toEqualTypeOf<___>(); // map returns what its function returns
