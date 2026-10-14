// title: keyof and indexed access
// intro: `keyof T` is the union of `T`'s property names, and `T[K]` the type of a property. Together they type functions that work on any property of an object.
interface User {
  id: number;
  name: string;
  admin: boolean;
}
assert.typeEqual<keyof User, ___>('keyof lists the property names');
assert.typeEqual<User['id' | 'admin'], ___>('an indexed access with a union');
function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const ada: User = { id: 1, name: 'Ada', admin: true };
assert.type<___>(get(ada, 'name'), 'K picks the property, T[K] gives its type');
assert.equal(get(ada, 'id'), ___, 'and the value comes back');
const settings = { theme: 'dark', size: 12 };
assert.typeEqual<typeof settings, ___>('typeof turns a value into a type');
