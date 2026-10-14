let total = 0;
expectTypeOf(total).toEqualTypeOf<number>(); // inferred from the starting value
const words = ['tea', 'cake'];
expectTypeOf(words).toEqualTypeOf<string[]>(); // an array of strings
const mixed = [1, 'two'];
expectTypeOf(mixed).toEqualTypeOf<(string | number)[]>(); // mixed items make a union
const point = { x: 1, y: 2 };
expectTypeOf(point).toEqualTypeOf<{ x: number; y: number }>(); // an object type, property by property
const double = (n: number) => n * 2;
expectTypeOf(double).returns.toEqualTypeOf<number>(); // .returns: what a function returns
