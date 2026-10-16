// title: Getters and setters
// intro: `get` makes a property computed when it's read, and `set` runs code when one is assigned.
const temperature = {
  celsius: 100,
  get fahrenheit() {
    return this.celsius * 9 / 5 + 32;
  },
  set fahrenheit(f) {
    this.celsius = (f - 32) * 5 / 9;
  },
};
expect(temperature.fahrenheit, 'a getter computes a value').toBe(___);
temperature.fahrenheit = 32;
expect(temperature.celsius, 'a setter runs on assignment').toBe(___);
expect(Object.keys(temperature), 'a getter is a property like any other').toContain(___);
