expect(1 + 1, 'values are tested with expect').toBe(2);
const greeting: string = 'hello';
expectTypeOf(greeting).toEqualTypeOf<string>(); // an annotation gives a variable its type
const count: number = 3.5;
expectTypeOf(count).toEqualTypeOf<number>(); // integers and fractions share one type
expectTypeOf<boolean>().toEqualTypeOf<true | false>(); // expectTypeOf<A>() checks a type directly
expect(greeting.length, 'types vanish when the code runs; values remain').toBe(5);
