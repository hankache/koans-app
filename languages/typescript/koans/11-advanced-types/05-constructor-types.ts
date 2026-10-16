// title: Constructor types
// intro: `new () => T` is the type of something you can call with `new` to get a `T`, such as a class. An `abstract` class only fits an `abstract new` type.
class Dog {
  sound() {
    return 'woof';
  }
}
function make<T>(Kind: new () => T): T {
  return new Kind();
}
expect(make(Dog).sound(), 'a class is a constructor').toBe(___);
expectTypeOf(make(Dog)).toEqualTypeOf<___>(); // make gives an instance
class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}
}
expectTypeOf<ConstructorParameters<typeof Point>>().toEqualTypeOf<___>(); // what new expects, as a tuple
abstract class Shape {
  abstract area(): number;
}
expectTypeOf<typeof Shape>().toExtend<___>(); // an abstract class fits an abstract constructor type
expectTypeOf<typeof Shape>().not.toExtend<___>(); // but not a concrete one
