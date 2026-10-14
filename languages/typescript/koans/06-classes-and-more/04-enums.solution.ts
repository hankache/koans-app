enum Direction {
  Up,
  Down,
}
assert.equal(Direction.Up, 0, 'numeric members count from 0');
assert.equal(Direction[1], 'Down', 'and map back to their names');
enum Level {
  Low = 'low',
  High = 'high',
}
assert.equal(Level.High, 'high', 'string members are strings');
const Status = { Active: 'active', Archived: 'archived' } as const;
type Status = (typeof Status)[keyof typeof Status];
assert.typeEqual<Status, 'active' | 'archived'>('an as const object gives a union of its values');
assert.equal(Status.Active, 'active', 'and names for them');
