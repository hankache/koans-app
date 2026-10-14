type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rect'; width: number; height: number };
function area(shape: Shape) {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'rect':
      expectTypeOf(shape).toEqualTypeOf<{ kind: 'rect'; width: number; height: number }>(); // the kind decides the member
      return shape.width * shape.height;
  }
}
expect(area({ kind: 'rect', width: 3, height: 4 }), 'a rectangle').toBe(12);
expect(area({ kind: 'circle', radius: 1 }), 'a circle').toBeCloseTo(3.14);
