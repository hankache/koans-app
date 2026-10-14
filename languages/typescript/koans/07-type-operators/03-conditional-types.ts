// title: Conditional types
// intro: `A extends B ? X : Y` picks a type by asking whether one type fits another. Given a union, it asks for each member separately.
type IsString<T> = T extends string ? 'yes' : 'no';
expectTypeOf<IsString<'hi'>>().toEqualTypeOf<___>(); // 'hi' is a string
expectTypeOf<IsString<42>>().toEqualTypeOf<___>(); // 42 is not
expectTypeOf<IsString<'a' | 1>>().toEqualTypeOf<___>(); // a union is asked member by member
type OnlyStrings<T> = T extends string ? T : never;
expectTypeOf<OnlyStrings<'a' | 1 | 'b'>>().toEqualTypeOf<___>(); // never filters members out
