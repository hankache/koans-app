function assertString(value: unknown): asserts value is string {
  if (typeof value !== 'string') throw new TypeError('not a string');
}
const input: unknown = 'koan';
assertString(input);
expectTypeOf(input).toEqualTypeOf<string>(); // narrowed from here on
expect(input.toUpperCase(), 'so string methods work').toBe('KOAN');
expect(() => assertString(5), 'the wrong type throws').toThrow(TypeError);
