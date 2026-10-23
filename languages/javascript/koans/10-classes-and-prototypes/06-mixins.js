// title: Mixins
// intro: A class can extend the result of a function, so behavior can be mixed into classes that don't share a parent.
const Serializable = Base => class extends Base {
  toJSON() {
    return JSON.stringify({ ...this });
  }
};
const Named = Base => class extends Base {
  greet() {
    return `I am ${this.name}`;
  }
};
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class User extends Named(Serializable(Object)) {
  constructor(name) {
    super();
    this.name = name;
  }
}
expect(new User('Ada').greet(), 'a mixed-in method').toBe(___);
expect(new User('Ada').toJSON(), 'and another').toBe(___);
expect(new (Serializable(Point))(1, 2).toJSON(), 'the same mixin on another class').toBe(___);
