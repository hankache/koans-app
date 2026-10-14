function firstOf<T>(items: T[]): T | undefined {
  return items[0];
}
expectTypeOf(firstOf([1, 2])).toEqualTypeOf<number | undefined>(); // T is number here
expectTypeOf(firstOf(['a'])).toEqualTypeOf<string | undefined>(); // and string here
expectTypeOf(firstOf<boolean>([])).toEqualTypeOf<boolean | undefined>(); // or given explicitly
function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}
expect(pair('x', 1), 'two type parameters').toEqual(['x', 1]);
