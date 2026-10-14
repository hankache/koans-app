// title: Classes
// intro: A class makes objects with shared methods. `extends` builds on another class, `#` makes a field private, and `static` puts something on the class itself.
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
assert.equal(rex.speak(), ___, 'a subclass can replace a method');
assert.equal(new Animal('Cat').speak(), ___, 'the parent keeps its own');
assert.equal(rex instanceof Animal, ___, 'a dog is an animal');
class Counter {
  #count = 0;
  static start = 0;
  increment() {
    return ++this.#count;
  }
}
const c = new Counter();
c.increment();
assert.equal(c.increment(), ___, 'a private field keeps its value');
assert.equal(Counter.start, ___, 'a static field belongs to the class');
assert.equal(typeof Dog, ___, 'a class is a function underneath');
