type Nullable<T> = { [K in keyof T]: T[K] | null };
expectTypeOf<Nullable<{ a: number; b: string }>>().toEqualTypeOf<{ a: number | null; b: string | null }>(); // every property, transformed
type Flags<T> = { [K in keyof T]: boolean };
expectTypeOf<Flags<{ x: string; y: number[] }>>().toEqualTypeOf<{ x: boolean; y: boolean }>(); // same keys, new types
type Mutable<T> = { -readonly [K in keyof T]: T[K] };
expectTypeOf<Mutable<{ readonly id: number }>>().toEqualTypeOf<{ id: number }>(); // -readonly removes readonly
type Complete<T> = { [K in keyof T]-?: T[K] };
expectTypeOf<Complete<{ name?: string }>>().toEqualTypeOf<{ name: string }>(); // -? removes optional
