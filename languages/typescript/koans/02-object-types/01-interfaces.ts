// title: Interfaces
// intro: An `interface` names the shape of an object: which properties it has, and their types. Objects of that shape can be given that type.
interface User {
  name: string;
  age: number;
}
const ada: User = { name: 'Ada', age: 36 };
expectTypeOf(ada.age).toEqualTypeOf<___>(); // a property's type comes from the interface
expectTypeOf<User['name']>().toEqualTypeOf<___>(); // so does User['name']
interface Admin extends User {
  permissions: string[];
}
const root: Admin = { name: 'root', age: 1, permissions: ['all'] };
expectTypeOf(root).toExtend<___>(); // an Admin is a User
expect(root.permissions, 'and it adds its own').toEqual(___);
