class Dog {
  sound() {
    return 'woof';
  }
}
function make<T>(Kind: new () => T): T {
  return new Kind();
}
expect(make(Dog).sound(), 'a class is a constructor').toBe('woof');
expectTypeOf(make(Dog)).toEqualTypeOf<Dog>(); // make gives an instance
class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}
}
expectTypeOf<ConstructorParameters<typeof Point>>().toEqualTypeOf<[number, number]>(); // what new expects, as a tuple
abstract class Shape {
  abstract area(): number;
}
expectTypeOf<typeof Shape>().toExtend<abstract new () => Shape>(); // an abstract class fits an abstract constructor type
expectTypeOf<typeof Shape>().not.toExtend<new () => Shape>(); // but not a concrete one
