// title: Inference
// intro: You rarely need to write a type: TypeScript infers one from each value, and from what a function returns.
let total = 0;
expectTypeOf(total).toEqualTypeOf<___>(); // inferred from the starting value
const words = ['tea', 'cake'];
expectTypeOf(words).toEqualTypeOf<___>(); // an array of strings
const mixed = [1, 'two'];
expectTypeOf(mixed).toEqualTypeOf<___>(); // mixed items make a union
const point = { x: 1, y: 2 };
expectTypeOf(point).toEqualTypeOf<___>(); // an object type, property by property
const double = (n: number) => n * 2;
expectTypeOf(double).returns.toEqualTypeOf<___>(); // .returns: what a function returns
