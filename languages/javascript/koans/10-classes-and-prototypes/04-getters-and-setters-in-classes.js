// title: Getters and setters in classes
// intro: Classes can have `get` and `set` accessors, often in front of a private field so a setter can check what it's given.
class Temperature {
  #celsius = 0;
  get celsius() {
    return this.#celsius;
  }
  set celsius(value) {
    if (value < -273.15) throw new RangeError('below absolute zero');
    this.#celsius = value;
  }
  get fahrenheit() {
    return this.#celsius * 9 / 5 + 32;
  }
}
const t = new Temperature();
t.celsius = 100;
expect(t.fahrenheit, 'a computed property').toBe(___);
expect(() => { t.celsius = -300; }, 'the setter checks its value').toThrow(___);
expect(t.celsius, 'and kept the old one').toBe(___);
