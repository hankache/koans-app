function parse(input: string): number;
function parse(input: number): string;
function parse(input: string | number): string | number {
  return typeof input === 'string' ? Number(input) : String(input);
}
expectTypeOf(parse('42')).toEqualTypeOf<number>(); // the string signature
expectTypeOf(parse(42)).toEqualTypeOf<string>(); // the number signature
expect(parse('42'), 'the value').toBe(42);
