// title: Conditional types
// intro: `T extends U ? X : Y` chooses a type by asking whether `T` fits `U`. `infer` captures part of a type, and over a union, a conditional type is applied to each member.
type IsString<T> = T extends string ? true : false;
assert.typeEqual<IsString<'a'>, ___>('a string literal is a string');
assert.typeEqual<IsString<42>, ___>('a number is not');
type ElementOf<T> = T extends (infer E)[] ? E : never;
assert.typeEqual<ElementOf<number[]>, ___>('infer captures the element type');
assert.typeEqual<ElementOf<string>, ___>('and gives never when it does not fit');
type ToArray<T> = T extends unknown ? T[] : never;
assert.typeEqual<ToArray<string | number>, ___>('a conditional type distributes over a union');
assert.typeEqual<Awaited<Promise<Promise<number>>>, ___>('Awaited unwraps promises, however deep');
