enum Direction {
  Up,
  Down,
  Left,
  Right,
}
expect(Direction.Left, 'members count from 0').toBe(2);
expect(Direction[1], 'a numeric enum maps back to names').toBe('Down');
enum Level {
  Low = 'low',
  High = 'high',
}
expect(Level.High, 'string members keep their value').toBe('high');
expectTypeOf<keyof typeof Level>().toEqualTypeOf<'Low' | 'High'>(); // the names of the members
