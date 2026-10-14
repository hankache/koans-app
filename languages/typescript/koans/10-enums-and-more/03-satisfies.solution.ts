type Palette = Record<string, string | [number, number, number]>;
const annotated: Palette = { red: [255, 0, 0], green: '#00ff00' };
expectTypeOf(annotated.green).toEqualTypeOf<string | [number, number, number]>(); // the annotation wins
const checked = { red: [255, 0, 0], green: '#00ff00' } satisfies Palette;
expectTypeOf(checked.green).toEqualTypeOf<string>(); // satisfies keeps the precise type
expect(checked.green.toUpperCase(), 'so string methods work').toBe('#00FF00');
expectTypeOf<keyof typeof checked>().toEqualTypeOf<'red' | 'green'>(); // and the exact keys
