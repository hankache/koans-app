const temperature = {
  celsius: 100,
  get fahrenheit() {
    return this.celsius * 9 / 5 + 32;
  },
  set fahrenheit(f) {
    this.celsius = (f - 32) * 5 / 9;
  },
};
expect(temperature.fahrenheit, 'a getter computes a value').toBe(212);
temperature.fahrenheit = 32;
expect(temperature.celsius, 'a setter runs on assignment').toBe(0);
expect(Object.keys(temperature), 'a getter is a property like any other').toContain('fahrenheit');
