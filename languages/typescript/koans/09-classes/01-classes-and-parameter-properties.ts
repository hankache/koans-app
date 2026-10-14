// title: Classes and parameter properties
// intro: A class's fields are typed like an interface's. Marking a constructor parameter `public`, `private` or `readonly` declares a field and assigns it in one go.
class Point {
  constructor(public readonly x: number, public readonly y: number) {}
  distanceTo(other: Point) {
    return Math.hypot(this.x - other.x, this.y - other.y);
  }
}
const origin = new Point(0, 0);
expect(new Point(3, 4).distanceTo(origin), 'a method').toBe(___);
expectTypeOf(origin.x).toEqualTypeOf<___>(); // a parameter property is a field
expectTypeOf(origin).toEqualTypeOf<___>(); // a class is also a type
expectTypeOf({ x: 1, y: 1, distanceTo: () => 0 }).toExtend<___>(); // compared by shape, like any type
