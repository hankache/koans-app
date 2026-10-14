// title: keyof and typeof
// intro: `keyof T` is the union of `T`'s keys. In a type, `typeof value` is that value's type, so types can be taken from values.
interface Point {
  x: number;
  y: number;
}
expectTypeOf<keyof Point>().toEqualTypeOf<___>(); // the keys, as a union
const defaults = { volume: 5, muted: false };
type Defaults = typeof defaults;
expectTypeOf<Defaults>().toEqualTypeOf<___>(); // a type from a value
expectTypeOf<keyof typeof defaults>().toEqualTypeOf<___>(); // and its keys
