// title: Mapped types
// intro: `{ [K in keyof T]: … }` builds a new object type with one property for each key of another, transforming each property's type.
type Nullable<T> = { [K in keyof T]: T[K] | null };
expectTypeOf<Nullable<{ a: number; b: string }>>().toEqualTypeOf<___>(); // every property, transformed
type Flags<T> = { [K in keyof T]: boolean };
expectTypeOf<Flags<{ x: string; y: number[] }>>().toEqualTypeOf<___>(); // same keys, new types
type Mutable<T> = { -readonly [K in keyof T]: T[K] };
expectTypeOf<Mutable<{ readonly id: number }>>().toEqualTypeOf<___>(); // -readonly removes readonly
type Complete<T> = { [K in keyof T]-?: T[K] };
expectTypeOf<Complete<{ name?: string }>>().toEqualTypeOf<___>(); // -? removes optional
