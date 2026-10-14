// title: typeof narrowing
// intro: Inside an `if (typeof x === …)`, TypeScript knows the narrower type, and in the `else` what's left of the union.
function pad(value: string | number) {
  if (typeof value === 'number') {
    expectTypeOf(value).toEqualTypeOf<___>(); // inside the check
    return ' '.repeat(value);
  }
  expectTypeOf(value).toEqualTypeOf<___>(); // after it, what is left
  return value;
}
expect(pad(3), 'three spaces').toBe(___);
expect(pad('x'), 'or the string itself').toBe(___);
