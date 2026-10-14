// title: Const objects instead of enums
// intro: Many projects use a plain object `as const` instead of an enum: it's just JavaScript, and its values' union is easy to get.
const Status = {
  Active: 'active',
  Banned: 'banned',
} as const;
type Status = (typeof Status)[keyof typeof Status];
expectTypeOf<Status>().toEqualTypeOf<___>(); // the union of its values
const s: Status = Status.Active;
expect(s, 'used like an enum').toBe(___);
expect(Object.values(Status), 'and it is an ordinary object').toEqual(___);
