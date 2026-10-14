// title: const type parameters
// intro: Inference usually widens literals. `<const T>` asks TypeScript to infer the narrowest type, as if the caller had written `as const`.
function wide<T>(value: T) {
  return value;
}
function narrow<const T>(value: T) {
  return value;
}
expectTypeOf(wide({ mode: 'dark' })).toEqualTypeOf<___>(); // inferred as usual
expectTypeOf(narrow({ mode: 'dark' })).toEqualTypeOf<___>(); // with const
function routes<const T extends readonly string[]>(paths: T): T[number] {
  return paths[0];
}
expectTypeOf(routes(['/home', '/about'])).toEqualTypeOf<___>(); // T[number]: any item
