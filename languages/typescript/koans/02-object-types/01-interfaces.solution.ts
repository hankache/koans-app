interface User {
  name: string;
  age: number;
}
const ada: User = { name: 'Ada', age: 36 };
expectTypeOf(ada.age).toEqualTypeOf<number>(); // a property's type comes from the interface
expectTypeOf<User['name']>().toEqualTypeOf<string>(); // so does User['name']
interface Admin extends User {
  permissions: string[];
}
const root: Admin = { name: 'root', age: 1, permissions: ['all'] };
expectTypeOf(root).toExtend<User>(); // an Admin is a User
expect(root.permissions, 'and it adds its own').toEqual(['all']);
