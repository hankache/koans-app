// title: implements and abstract
// intro: `implements` checks that a class has what an interface asks for. An `abstract` class leaves some methods for its subclasses to write.
interface Shape {
  area(): number;
}
class Square implements Shape {
  constructor(private side: number) {}
  area(): number {
    return this.side ** 2;
  }
}
assert.equal(new Square(3).area(), ___, 'Square implements Shape');
const shapes: Shape[] = [new Square(2), { area: () => 1 }];
assert.equal(shapes.reduce((total, s) => total + s.area(), 0), ___, 'any object with an area() is a Shape');
abstract class Animal {
  abstract sound(): string;
  speak(): string {
    return `It says ${this.sound()}`;
  }
}
class Cow extends Animal {
  sound(): string {
    return 'moo';
  }
}
assert.equal(new Cow().speak(), ___, 'the subclass writes the abstract method');
assert.type<___>(new Cow() as Animal, 'as tells TypeScript to treat a value as another type');
