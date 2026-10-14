interface Point {
  x: number;
  y: number;
}
expectTypeOf<keyof Point>().toEqualTypeOf<'x' | 'y'>(); // the keys, as a union
const defaults = { volume: 5, muted: false };
type Defaults = typeof defaults;
expectTypeOf<Defaults>().toEqualTypeOf<{ volume: number; muted: boolean }>(); // a type from a value
expectTypeOf<keyof typeof defaults>().toEqualTypeOf<'volume' | 'muted'>(); // and its keys
