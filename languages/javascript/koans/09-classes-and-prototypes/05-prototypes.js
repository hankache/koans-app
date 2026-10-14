// title: Prototypes
// intro: Every object has a prototype it inherits from; a class's methods live on its `prototype`. `Object.create` makes an object with a chosen prototype.
class Animal {
  speak() {
    return 'sound';
  }
}
const pet = new Animal();
expect(Object.getPrototypeOf(pet) === Animal.prototype, 'an instance inherits from the class prototype').toBe(___);
expect(Object.hasOwn(pet, 'speak'), 'the method is not on the object itself').toBe(___);
expect('speak' in pet, 'but in finds it on the prototype').toBe(___);
const base = { greet() { return `hi from ${this.name}`; } };
const child = Object.create(base);
child.name = 'child';
expect(child.greet(), 'Object.create chooses the prototype').toBe(___);
expect(Object.getPrototypeOf([]) === Array.prototype, 'arrays inherit from Array.prototype').toBe(___);
