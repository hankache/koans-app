// title: Assertion functions
// intro: A function declared `asserts value is T` throws unless the value is a `T`; after a call to it, TypeScript treats the value as a `T`.
function assertString(value: unknown): asserts value is string {
  if (typeof value !== 'string') throw new TypeError('not a string');
}
const input: unknown = 'koan';
assertString(input);
expectTypeOf(input).toEqualTypeOf<___>(); // narrowed from here on
expect(input.toUpperCase(), 'so string methods work').toBe(___);
expect(() => assertString(5), 'the wrong type throws').toThrow(___);
