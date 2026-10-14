// title: Overloads
// intro: Overload signatures give one function several typed ways to be called, each with its own result type. The implementation below them is not callable directly.
function parse(input: string): number;
function parse(input: number): string;
function parse(input: string | number): string | number {
  return typeof input === 'string' ? Number(input) : String(input);
}
expectTypeOf(parse('42')).toEqualTypeOf<___>(); // the string signature
expectTypeOf(parse(42)).toEqualTypeOf<___>(); // the number signature
expect(parse('42'), 'the value').toBe(___);
