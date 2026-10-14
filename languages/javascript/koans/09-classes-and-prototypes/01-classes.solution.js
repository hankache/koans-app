class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound`;
  }
}
const cat = new Animal('Tom');
expect(cat.speak(), 'a method').toBe('Tom makes a sound');
expect(cat, 'an object made by a class is an instance of it').toBeInstanceOf(Animal);
expect(typeof Animal, 'a class is a function underneath').toBe('function');
expect(() => Animal('Tom'), 'and must be called with new').toThrow(TypeError);
