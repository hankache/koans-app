// title: Optional and readonly
// intro: A `?` makes a property optional, so its type includes `undefined`. `readonly` makes one that can't be assigned to, at compile time.
interface Settings {
  readonly id: number;
  theme?: 'light' | 'dark';
}
const s: Settings = { id: 1 };
expectTypeOf(s.theme).toEqualTypeOf<___>(); // optional means maybe undefined
expect(s.theme, 'and here it is').toBe(___);
expect(s.theme ?? 'light', 'so give it a default').toBe(___);
const frozen: Readonly<{ count: number }> = { count: 1 };
expectTypeOf(frozen).toEqualTypeOf<___>(); // Readonly<T> marks every property
