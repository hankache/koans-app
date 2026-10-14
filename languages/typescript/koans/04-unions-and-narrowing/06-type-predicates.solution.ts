interface Cat {
  meow(): string;
}
function isCat(pet: unknown): pet is Cat {
  return typeof pet === 'object' && pet !== null && 'meow' in pet;
}
const pet: unknown = { meow: () => 'meow' };
if (isCat(pet)) {
  expectTypeOf(pet).toEqualTypeOf<Cat>(); // the guard narrowed it
  expect(pet.meow(), 'so its method can be called').toBe('meow');
}
const things: unknown[] = [{ meow: () => 'a' }, 42, { meow: () => 'b' }];
expectTypeOf(things.filter(isCat)).toEqualTypeOf<Cat[]>(); // filter uses the guard too
