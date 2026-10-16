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
expect(t.fahrenheit, 'a computed property').toBe(212);
expect(() => { t.celsius = -300; }, 'the setter checks its value').toThrow(RangeError);
expect(t.celsius, 'and kept the old one').toBe(100);
