function describe(id: string | number) {
  return `id ${id.toString()}`;
}
expect(describe(7), 'toString works on both').toBe('id 7');
expectTypeOf<string | number>().toEqualTypeOf<number | string>(); // order does not matter
expectTypeOf<'a' | 'a' | 'b'>().toEqualTypeOf<'a' | 'b'>(); // duplicates collapse
expectTypeOf<'a' | string>().toEqualTypeOf<string>(); // a literal is absorbed by its type
type Shape = { kind: 'circle'; r: number } | { kind: 'square'; side: number };
expectTypeOf<Shape['kind']>().toEqualTypeOf<'circle' | 'square'>(); // a common property of a union
