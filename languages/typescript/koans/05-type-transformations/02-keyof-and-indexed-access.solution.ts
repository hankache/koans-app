interface User {
  id: number;
  name: string;
  admin: boolean;
}
assert.typeEqual<keyof User, 'id' | 'name' | 'admin'>('keyof lists the property names');
assert.typeEqual<User['id' | 'admin'], number | boolean>('an indexed access with a union');
function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const ada: User = { id: 1, name: 'Ada', admin: true };
assert.type<string>(get(ada, 'name'), 'K picks the property, T[K] gives its type');
assert.equal(get(ada, 'id'), 1, 'and the value comes back');
const settings = { theme: 'dark', size: 12 };
assert.typeEqual<typeof settings, { theme: string; size: number }>('typeof turns a value into a type');
