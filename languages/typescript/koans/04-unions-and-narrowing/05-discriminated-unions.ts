// title: Discriminated unions
// intro: Give each member of a union a literal `kind`, and checking it narrows the value to that member. A `switch` on it handles every case.
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rect'; width: number; height: number };
function area(shape: Shape) {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'rect':
      expectTypeOf(shape).toEqualTypeOf<___>(); // the kind decides the member
      return shape.width * shape.height;
  }
}
expect(area({ kind: 'rect', width: 3, height: 4 }), 'a rectangle').toBe(___);
expect(area({ kind: 'circle', radius: 1 }), 'a circle').toBeCloseTo(___);
