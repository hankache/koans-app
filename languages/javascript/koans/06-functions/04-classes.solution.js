class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound`;
  }
}
class Dog extends Animal {
  speak() {
    return `${this.name} barks`;
  }
}
const rex = new Dog('Rex');
assert.equal(rex.speak(), 'Rex barks', 'a subclass can replace a method');
assert.equal(new Animal('Cat').speak(), 'Cat makes a sound', 'the parent keeps its own');
assert.equal(rex instanceof Animal, true, 'a dog is an animal');
class Counter {
  #count = 0;
  static start = 0;
  increment() {
    return ++this.#count;
  }
}
const c = new Counter();
c.increment();
assert.equal(c.increment(), 2, 'a private field keeps its value');
assert.equal(Counter.start, 0, 'a static field belongs to the class');
assert.equal(typeof Dog, 'function', 'a class is a function underneath');
