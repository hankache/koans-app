// title: Pick and Omit
// intro: `Pick<T, Keys>` keeps some properties of a type, and `Omit<T, Keys>` keeps all the others.
interface User {
  id: number;
  name: string;
  password: string;
}
expectTypeOf<Pick<User, 'id' | 'name'>>().toEqualTypeOf<___>(); // keep some
type PublicUser = Omit<User, 'password'>;
expectTypeOf<keyof PublicUser>().toEqualTypeOf<___>(); // drop some
function toPublic({ password, ...rest }: User): PublicUser {
  return rest;
}
expect(toPublic({ id: 1, name: 'Ada', password: 'x' }), 'rest destructuring does it at run time').toEqual(___);
