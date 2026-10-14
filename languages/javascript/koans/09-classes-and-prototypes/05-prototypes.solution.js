class Animal {
  speak() {
    return 'sound';
  }
}
const pet = new Animal();
expect(Object.getPrototypeOf(pet) === Animal.prototype, 'an instance inherits from the class prototype').toBe(true);
expect(Object.hasOwn(pet, 'speak'), 'the method is not on the object itself').toBe(false);
expect('speak' in pet, 'but in finds it on the prototype').toBe(true);
const base = { greet() { return `hi from ${this.name}`; } };
const child = Object.create(base);
child.name = 'child';
expect(child.greet(), 'Object.create chooses the prototype').toBe('hi from child');
expect(Object.getPrototypeOf([]) === Array.prototype, 'arrays inherit from Array.prototype').toBe(true);
