// title: Generic functions
// intro: A type parameter, `<T>`, lets a function work for any type while keeping track of which one it was given. TypeScript infers `T` from the arguments.
function firstOf<T>(items: T[]): T | undefined {
  return items[0];
}
expectTypeOf(firstOf([1, 2])).toEqualTypeOf<___>(); // T is number here
expectTypeOf(firstOf(['a'])).toEqualTypeOf<___>(); // and string here
expectTypeOf(firstOf<boolean>([])).toEqualTypeOf<___>(); // or given explicitly
function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}
expect(pair('x', 1), 'two type parameters').toEqual(___);
