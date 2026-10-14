interface Settings {
  theme: string;
  fontSize?: number;
}
function update(current: Settings, changes: Partial<Settings>): Settings {
  return { ...current, ...changes };
}
expect(update({ theme: 'light' }, { fontSize: 14 }), 'only some properties change').toEqual({ theme: 'light', fontSize: 14 });
expectTypeOf<Partial<Settings>>().toEqualTypeOf<{ theme?: string; fontSize?: number }>(); // all optional
expectTypeOf<Required<Settings>['fontSize']>().toEqualTypeOf<number>(); // required, no longer undefined
