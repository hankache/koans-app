// title: satisfies
// intro: `value satisfies T` checks a value against a type without changing the value's own, more precise, inferred type. An annotation would widen it to `T`.
type Palette = Record<string, string | [number, number, number]>;
const annotated: Palette = { red: [255, 0, 0], green: '#00ff00' };
expectTypeOf(annotated.green).toEqualTypeOf<___>(); // the annotation wins
const checked = { red: [255, 0, 0], green: '#00ff00' } satisfies Palette;
expectTypeOf(checked.green).toEqualTypeOf<___>(); // satisfies keeps the precise type
expect(checked.green.toUpperCase(), 'so string methods work').toBe(___);
expectTypeOf<keyof typeof checked>().toEqualTypeOf<___>(); // and the exact keys
