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
expectTypeOf<Exclude<Light, 'red' | 'green' | 'amber'>>().toEqualTypeOf<never>(); // what is left after every case
expect(next('green'), 'after green').toBe('amber');
expect(() => assertNever('blue' as never), 'at run time it still throws').toThrow('unexpected: blue');
