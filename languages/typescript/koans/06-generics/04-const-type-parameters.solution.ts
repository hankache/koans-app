function wide<T>(value: T) {
  return value;
}
function narrow<const T>(value: T) {
  return value;
}
expectTypeOf(wide({ mode: 'dark' })).toEqualTypeOf<{ mode: string }>(); // inferred as usual
expectTypeOf(narrow({ mode: 'dark' })).toEqualTypeOf<{ readonly mode: 'dark' }>(); // with const
function routes<const T extends readonly string[]>(paths: T): T[number] {
  return paths[0];
}
expectTypeOf(routes(['/home', '/about'])).toEqualTypeOf<'/home' | '/about'>(); // T[number]: any item
