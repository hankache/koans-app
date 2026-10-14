// title: Truthiness and equality
// intro: A truthiness check rules out `null` and `undefined`; comparing with `===` narrows both sides to what they could have in common.
function greet(name: string | null | undefined) {
  if (name) {
    expectTypeOf(name).toEqualTypeOf<___>(); // truthy rules out null and undefined
    return `hi ${name}`;
  }
  return 'hi stranger';
}
expect(greet('Ada'), 'a name').toBe('hi Ada');
expect(greet(''), 'but the empty string is falsy too').toBe(___);
function same(a: string | number, b: string | boolean) {
  if (a === b) {
    expectTypeOf(a).toEqualTypeOf<___>(); // equal values must share a type
    return true;
  }
  return false;
}
expect(same('x', 'x'), 'equal').toBe(___);
