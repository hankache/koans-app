// title: Inheritance
// intro: `extends` builds on another class. `super(…)` calls the parent's constructor, and `super.method()` its version of a method.
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound`;
  }
}
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  speak() {
    return super.speak().replace('makes a sound', 'barks');
  }
}
const rex = new Dog('Rex', 'collie');
expect(rex.speak(), 'super.speak calls the parent').toBe(___);
expect(rex.breed, 'the subclass adds its own fields').toBe(___);
expect(rex, 'a dog is an animal').toBeInstanceOf(___);
