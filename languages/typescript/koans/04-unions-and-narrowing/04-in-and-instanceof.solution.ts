type Fish = { swim: () => string };
type Bird = { fly: () => string };
function move(animal: Fish | Bird) {
  if ('swim' in animal) {
    expectTypeOf(animal).toEqualTypeOf<Fish>(); // in narrows to the type with that property
    return animal.swim();
  }
  return animal.fly();
}
expect(move({ swim: () => 'splash' }), 'a fish swims').toBe('splash');
expect(move({ fly: () => 'flap' }), 'a bird flies').toBe('flap');
function when(value: Date | string) {
  return value instanceof Date ? value.getUTCFullYear() : value;
}
expectTypeOf(when).returns.toEqualTypeOf<string | number>(); // each branch adds to the result
expect(when(new Date(Date.UTC(2026, 0, 1))), 'instanceof narrows to the class').toBe(2026);
