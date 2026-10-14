interface Point {
  x: number;
  y: number;
}
const point3d = { x: 1, y: 2, z: 3 };
const flat: Point = point3d;
expect(flat.x + flat.y, 'extra properties are fine').toBe(3);
expectTypeOf(point3d).toExtend<Point>(); // it has everything Point asks for
interface Vector {
  x: number;
  y: number;
}
expectTypeOf<Point>().toEqualTypeOf<Vector>(); // same shape, same type, whatever the name
expectTypeOf<{ x: number }>().not.toExtend<Point>(); // a missing property does not fit
