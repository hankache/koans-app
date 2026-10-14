type IsString<T> = T extends string ? true : false;
assert.typeEqual<IsString<'a'>, true>('a string literal is a string');
assert.typeEqual<IsString<42>, false>('a number is not');
type ElementOf<T> = T extends (infer E)[] ? E : never;
assert.typeEqual<ElementOf<number[]>, number>('infer captures the element type');
assert.typeEqual<ElementOf<string>, never>('and gives never when it does not fit');
type ToArray<T> = T extends unknown ? T[] : never;
assert.typeEqual<ToArray<string | number>, string[] | number[]>('a conditional type distributes over a union');
assert.typeEqual<Awaited<Promise<Promise<number>>>, number>('Awaited unwraps promises, however deep');
