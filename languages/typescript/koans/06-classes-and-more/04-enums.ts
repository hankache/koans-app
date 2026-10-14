// title: Enums
// intro: An `enum` names a set of values. Numeric members count up from 0 and map back to their names; string members are just strings. An `as const` object gives the same names with no enum at all.
enum Direction {
  Up,
  Down,
}
assert.equal(Direction.Up, ___, 'numeric members count from 0');
assert.equal(Direction[1], ___, 'and map back to their names');
enum Level {
  Low = 'low',
  High = 'high',
}
assert.equal(Level.High, ___, 'string members are strings');
const Status = { Active: 'active', Archived: 'archived' } as const;
type Status = (typeof Status)[keyof typeof Status];
assert.typeEqual<Status, ___>('an as const object gives a union of its values');
assert.equal(Status.Active, ___, 'and names for them');
