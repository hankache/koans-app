const Status = {
  Active: 'active',
  Banned: 'banned',
} as const;
type Status = (typeof Status)[keyof typeof Status];
expectTypeOf<Status>().toEqualTypeOf<'active' | 'banned'>(); // the union of its values
const s: Status = Status.Active;
expect(s, 'used like an enum').toBe('active');
expect(Object.values(Status), 'and it is an ordinary object').toEqual(['active', 'banned']);
