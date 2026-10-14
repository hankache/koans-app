interface Settings {
  readonly id: number;
  theme?: 'light' | 'dark';
}
const s: Settings = { id: 1 };
expectTypeOf(s.theme).toEqualTypeOf<'light' | 'dark' | undefined>(); // optional means maybe undefined
expect(s.theme, 'and here it is').toBe(undefined);
expect(s.theme ?? 'light', 'so give it a default').toBe('light');
const frozen: Readonly<{ count: number }> = { count: 1 };
expectTypeOf(frozen).toEqualTypeOf<{ readonly count: number }>(); // Readonly<T> marks every property
