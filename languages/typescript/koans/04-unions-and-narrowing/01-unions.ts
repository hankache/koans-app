// title: Unions
// intro: `A | B` is a value that is either an `A` or a `B`. Until you check which, only what both have in common can be used.
function describe(id: string | number) {
  return `id ${id.toString()}`;
}
expect(describe(7), 'toString works on both').toBe(___);
expectTypeOf<string | number>().toEqualTypeOf<___>(); // order does not matter
expectTypeOf<'a' | 'a' | 'b'>().toEqualTypeOf<___>(); // duplicates collapse
expectTypeOf<'a' | string>().toEqualTypeOf<___>(); // a literal is absorbed by its type
type Shape = { kind: 'circle'; r: number } | { kind: 'square'; side: number };
expectTypeOf<Shape['kind']>().toEqualTypeOf<___>(); // a common property of a union
