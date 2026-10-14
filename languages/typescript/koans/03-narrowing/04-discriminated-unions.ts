// title: Discriminated unions
// intro: When every member of a union has a property with its own literal value, like `kind`, checking that property picks the member.
type Shape = { kind: 'circle'; radius: number } | { kind: 'square'; side: number };
assert.typeEqual<Shape['kind'], ___>('the kinds, as a union');
function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      assert.type<___>(shape, 'the kind picks one member');
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.side ** 2;
  }
}
assert.equal(area({ kind: 'square', side: 3 }), ___, 'a square');
assert.equal(Math.round(area({ kind: 'circle', radius: 1 }) * 100), ___, 'a circle');
