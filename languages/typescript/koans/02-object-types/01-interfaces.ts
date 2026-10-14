// title: Interfaces
// intro: An interface describes the shape of an object. `extends` builds on another interface, and `T['key']` reads the type of a property.
interface Person {
  name: string;
  age: number;
}
const ada: Person = { name: 'Ada', age: 36 };
assert.type<___>(ada, 'an interface is a type');
assert.equal(ada.age, ___, 'and the object is an ordinary object');
assert.typeEqual<Person['name'], ___>('an indexed access type reads a property type');
interface Employee extends Person {
  company: string;
}
assert.typeEqual<keyof Employee, ___>('extends adds properties');
