// title: Type predicates
// intro: A function that returns `value is T` is a type guard: where it returns true, TypeScript treats the value as a `T`.
interface Cat {
  meow(): string;
}
function isCat(pet: unknown): pet is Cat {
  return typeof pet === 'object' && pet !== null && 'meow' in pet;
}
const pet: unknown = { meow: () => 'meow' };
if (isCat(pet)) {
  expectTypeOf(pet).toEqualTypeOf<___>(); // the guard narrowed it
  expect(pet.meow(), 'so its method can be called').toBe(___);
}
const things: unknown[] = [{ meow: () => 'a' }, 42, { meow: () => 'b' }];
expectTypeOf(things.filter(isCat)).toEqualTypeOf<___>(); // filter uses the guard too
