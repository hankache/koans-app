// title: Enums
// intro: An `enum` names a set of constants. Numeric members count up from 0 and can be looked up in reverse; string members can't.
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
expect(Direction.Left, 'members count from 0').toBe(___);
expect(Direction[1], 'a numeric enum maps back to names').toBe(___);
enum Level {
  Low = 'low',
  High = 'high',
}
expect(Level.High, 'string members keep their value').toBe(___);
expectTypeOf<keyof typeof Level>().toEqualTypeOf<___>(); // the names of the members
