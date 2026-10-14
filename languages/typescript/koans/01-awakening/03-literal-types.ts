// title: Literal types
// intro: A single value can be a type: `'red'`, `42`, `true`. A `const` keeps its literal type; a `let`, which can change, widens to the general one.
const answer = 42;
expectTypeOf(answer).toEqualTypeOf<___>(); // a const keeps its literal type
let changing = 42;
expectTypeOf(changing).toEqualTypeOf<___>(); // a let widens
let light: 'red' | 'amber' | 'green' = 'red';
light = 'green';
expect(light, 'a union of literals limits the values').toBe(___);
expectTypeOf(light).toEqualTypeOf<___>(); // and narrows after an assignment
expectTypeOf<'a'>().toExtend<___>(); // toExtend: every 'a' is a string
expectTypeOf<string>().not.toExtend<___>(); // but not every string is 'a'
