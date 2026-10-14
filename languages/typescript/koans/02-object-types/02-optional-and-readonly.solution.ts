interface Settings {
  readonly id: number;
  theme: string;
  fontSize?: number;
}
const settings: Settings = { id: 1, theme: 'dark' };
assert.type<number | undefined>(settings.fontSize, 'an optional property may be undefined');
assert.equal(settings.fontSize, undefined, 'and here it is');
assert.equal(settings.fontSize ?? 14, 14, '?? gives a default');
assert.typeEqual<Partial<{ a: number }>, { a?: number }>('Partial makes every property optional');
assert.typeEqual<Required<{ a?: number }>, { a: number }>('Required undoes it');
