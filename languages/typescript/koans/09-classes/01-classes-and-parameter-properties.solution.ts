class Point {
  constructor(public readonly x: number, public readonly y: number) {}
  distanceTo(other: Point) {
    return Math.hypot(this.x - other.x, this.y - other.y);
  }
}
const origin = new Point(0, 0);
expect(new Point(3, 4).distanceTo(origin), 'a method').toBe(5);
expectTypeOf(origin.x).toEqualTypeOf<number>(); // a parameter property is a field
expectTypeOf(origin).toEqualTypeOf<Point>(); // a class is also a type
expectTypeOf({ x: 1, y: 1, distanceTo: () => 0 }).toExtend<Point>(); // compared by shape, like any type
