// title: Abstract classes
// intro: An `abstract` class can't be instantiated: it's a base for others, and its `abstract` members must be written by every subclass.
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
expect(sq.describe(), 'the base calls the subclass').toBe(___);
expect(sq, 'a square is a shape').toBeInstanceOf(___);
expectTypeOf(sq.area).returns.toEqualTypeOf<___>(); // the abstract signature types the method
