// title: Exhaustiveness
// intro: When every member of a union is handled, what's left is `never`. Passing it to a function that takes `never` makes the compiler complain if a new member is ever forgotten.
type Light = 'red' | 'amber' | 'green';
function assertNever(value: never): never {
  throw new Error(`unexpected: ${value}`);
}
function next(light: Light): Light {
  if (light === 'red') return 'green';
  if (light === 'green') return 'amber';
  if (light === 'amber') return 'red';
  return assertNever(light);
}
expectTypeOf<Exclude<Light, 'red' | 'green' | 'amber'>>().toEqualTypeOf<___>(); // what is left after every case
expect(next('green'), 'after green').toBe(___);
expect(() => assertNever('blue' as never), 'at run time it still throws').toThrow(___);
