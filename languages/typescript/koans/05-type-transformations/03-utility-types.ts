// title: Utility types
// intro: TypeScript comes with types that build new types from old ones: `Partial`, `Pick`, `Omit`, `Exclude`, `NonNullable` and more.
interface Todo {
  title: string;
  done: boolean;
  due: string;
}
assert.typeEqual<Pick<Todo, 'title'>, ___>('Pick keeps some properties');
assert.typeEqual<Omit<Todo, 'due'>, ___>('Omit leaves some out');
assert.typeEqual<Exclude<'a' | 'b' | 'c', 'a'>, ___>('Exclude removes members of a union');
assert.typeEqual<Extract<string | number | boolean, number | boolean>, ___>('Extract keeps them');
assert.typeEqual<NonNullable<string | null | undefined>, ___>('NonNullable removes null and undefined');
assert.typeEqual<ReturnType<() => boolean>, ___>('ReturnType, from a function type');
