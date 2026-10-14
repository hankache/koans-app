// title: Optional and readonly
// intro: `?` makes a property optional, so it may be `undefined`. `readonly` stops it being changed after the object is made.
interface Settings {
  readonly id: number;
  theme: string;
  fontSize?: number;
}
const settings: Settings = { id: 1, theme: 'dark' };
assert.type<___>(settings.fontSize, 'an optional property may be undefined');
assert.equal(settings.fontSize, ___, 'and here it is');
assert.equal(settings.fontSize ?? 14, ___, '?? gives a default');
assert.typeEqual<Partial<{ a: number }>, ___>('Partial makes every property optional');
assert.typeEqual<Required<{ a?: number }>, ___>('Required undoes it');
