const values = [1, 'two', 3, null];
expectTypeOf(values).toEqualTypeOf<(string | number | null)[]>(); // every kind of item
const numbers = values.filter(v => typeof v === 'number');
expectTypeOf(numbers).toEqualTypeOf<number[]>(); // a type test in filter narrows the result
expect(numbers, 'and here they are').toEqual([1, 3]);
const found = [1, 2, 3].find(n => n > 5);
expectTypeOf(found).toEqualTypeOf<number | undefined>(); // find may find nothing
expectTypeOf([1, 2].map(String)).toEqualTypeOf<string[]>(); // map returns what its function returns
