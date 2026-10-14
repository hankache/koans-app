const answer = 42;
expectTypeOf(answer).toEqualTypeOf<42>(); // a const keeps its literal type
let changing = 42;
expectTypeOf(changing).toEqualTypeOf<number>(); // a let widens
let light: 'red' | 'amber' | 'green' = 'red';
light = 'green';
expect(light, 'a union of literals limits the values').toBe('green');
expectTypeOf(light).toEqualTypeOf<'green'>(); // and narrows after an assignment
expectTypeOf<'a'>().toExtend<string>(); // toExtend: every 'a' is a string
expectTypeOf<string>().not.toExtend<'a'>(); // but not every string is 'a'
