type Shape = { kind: 'circle'; radius: number } | { kind: 'square'; side: number };
assert.typeEqual<Shape['kind'], 'circle' | 'square'>('the kinds, as a union');
function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      assert.type<{ kind: 'circle'; radius: number }>(shape, 'the kind picks one member');
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.side ** 2;
  }
}
assert.equal(area({ kind: 'square', side: 3 }), 9, 'a square');
assert.equal(Math.round(area({ kind: 'circle', radius: 1 }) * 100), 314, 'a circle');
