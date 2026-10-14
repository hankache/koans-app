abstract class Shape {
  abstract area(): number;
  describe() {
    return `area ${this.area().toFixed(1)}`;
  }
}
class Square extends Shape {
  constructor(private side: number) {
    super();
  }
  area() {
    return this.side ** 2;
  }
}
const sq: Shape = new Square(3);
expect(sq.describe(), 'the base calls the subclass').toBe('area 9.0');
expect(sq, 'a square is a shape').toBeInstanceOf(Shape);
expectTypeOf(sq.area).returns.toEqualTypeOf<number>(); // the abstract signature types the method
