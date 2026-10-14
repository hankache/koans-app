function greet(name: string | null | undefined) {
  if (name) {
    expectTypeOf(name).toEqualTypeOf<string>(); // truthy rules out null and undefined
    return `hi ${name}`;
  }
  return 'hi stranger';
}
expect(greet('Ada'), 'a name').toBe('hi Ada');
expect(greet(''), 'but the empty string is falsy too').toBe('hi stranger');
function same(a: string | number, b: string | boolean) {
  if (a === b) {
    expectTypeOf(a).toEqualTypeOf<string>(); // equal values must share a type
    return true;
  }
  return false;
}
expect(same('x', 'x'), 'equal').toBe(true);
