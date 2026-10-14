// title: Expectations
// intro: Values are tested with Vitest's `expect`, as in JavaScript. Types are tested with its `expectTypeOf`: `expectTypeOf(value).toEqualTypeOf<T>()` passes when the value's type is exactly `T`. The comment at the end of the line describes the check.
expect(1 + 1, 'values are tested with expect').toBe(___);
const greeting: string = 'hello';
expectTypeOf(greeting).toEqualTypeOf<___>(); // an annotation gives a variable its type
const count: number = 3.5;
expectTypeOf(count).toEqualTypeOf<___>(); // integers and fractions share one type
expectTypeOf<boolean>().toEqualTypeOf<___>(); // expectTypeOf<A>() checks a type directly
expect(greeting.length, 'types vanish when the code runs; values remain').toBe(___);
