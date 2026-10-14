// title: Partial, Required and Readonly
// intro: `Partial<T>` makes every property optional, `Required<T>` makes every one required, and `Readonly<T>` makes every one readonly.
interface Settings {
  theme: string;
  fontSize?: number;
}
function update(current: Settings, changes: Partial<Settings>): Settings {
  return { ...current, ...changes };
}
expect(update({ theme: 'light' }, { fontSize: 14 }), 'only some properties change').toEqual(___);
expectTypeOf<Partial<Settings>>().toEqualTypeOf<___>(); // all optional
expectTypeOf<Required<Settings>['fontSize']>().toEqualTypeOf<___>(); // required, no longer undefined
