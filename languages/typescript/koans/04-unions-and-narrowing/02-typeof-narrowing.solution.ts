function pad(value: string | number) {
  if (typeof value === 'number') {
    expectTypeOf(value).toEqualTypeOf<number>(); // inside the check
    return ' '.repeat(value);
  }
  expectTypeOf(value).toEqualTypeOf<string>(); // after it, what is left
  return value;
}
expect(pad(3), 'three spaces').toBe('   ');
expect(pad('x'), 'or the string itself').toBe('x');
