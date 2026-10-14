interface User {
  id: number;
  name: string;
  password: string;
}
expectTypeOf<Pick<User, 'id' | 'name'>>().toEqualTypeOf<{ id: number; name: string }>(); // keep some
type PublicUser = Omit<User, 'password'>;
expectTypeOf<keyof PublicUser>().toEqualTypeOf<'id' | 'name'>(); // drop some
function toPublic({ password, ...rest }: User): PublicUser {
  return rest;
}
expect(toPublic({ id: 1, name: 'Ada', password: 'x' }), 'rest destructuring does it at run time').toEqual({ id: 1, name: 'Ada' });
