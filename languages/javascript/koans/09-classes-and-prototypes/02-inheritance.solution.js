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
expect(rex.speak(), 'super.speak calls the parent').toBe('Rex barks');
expect(rex.breed, 'the subclass adds its own fields').toBe('collie');
expect(rex, 'a dog is an animal').toBeInstanceOf(Animal);
