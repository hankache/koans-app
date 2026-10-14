type IsString<T> = T extends string ? 'yes' : 'no';
expectTypeOf<IsString<'hi'>>().toEqualTypeOf<'yes'>(); // 'hi' is a string
expectTypeOf<IsString<42>>().toEqualTypeOf<'no'>(); // 42 is not
expectTypeOf<IsString<'a' | 1>>().toEqualTypeOf<'yes' | 'no'>(); // a union is asked member by member
type OnlyStrings<T> = T extends string ? T : never;
expectTypeOf<OnlyStrings<'a' | 1 | 'b'>>().toEqualTypeOf<'a' | 'b'>(); // never filters members out
