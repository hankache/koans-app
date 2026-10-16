// title: Classes
// intro: A class makes objects with shared methods. `constructor` sets each new object up, and `new` calls it.
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound`;
  }
}
const cat = new Animal('Tom');
expect(cat.speak(), 'a method').toBe(___);
expect(cat, 'an object made by a class is an instance of it').toBeInstanceOf(___);
expect(typeof Animal, 'a class is a function underneath').toBe(___);
expect(() => Animal('Tom'), 'and must be called with new').toThrow(___);
