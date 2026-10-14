interface Person {
  name: string;
  age: number;
}
const ada: Person = { name: 'Ada', age: 36 };
assert.type<Person>(ada, 'an interface is a type');
assert.equal(ada.age, 36, 'and the object is an ordinary object');
assert.typeEqual<Person['name'], string>('an indexed access type reads a property type');
interface Employee extends Person {
  company: string;
}
assert.typeEqual<keyof Employee, 'name' | 'age' | 'company'>('extends adds properties');
