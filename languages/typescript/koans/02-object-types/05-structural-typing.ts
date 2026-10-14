// title: Structural typing
// intro: TypeScript compares types by their shape, not their name: an object fits a type if it has the properties the type asks for, even with extra ones.
interface Point {
  x: number;
  y: number;
}
const point3d = { x: 1, y: 2, z: 3 };
const flat: Point = point3d;
expect(flat.x + flat.y, 'extra properties are fine').toBe(___);
expectTypeOf(point3d).toExtend<___>(); // it has everything Point asks for
interface Vector {
  x: number;
  y: number;
}
expectTypeOf<Point>().toEqualTypeOf<___>(); // same shape, same type, whatever the name
expectTypeOf<{ x: number }>().not.toExtend<___>(); // a missing property does not fit
