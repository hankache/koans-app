interface Todo {
  title: string;
  done: boolean;
  due: string;
}
assert.typeEqual<Pick<Todo, 'title'>, { title: string }>('Pick keeps some properties');
assert.typeEqual<Omit<Todo, 'due'>, { title: string; done: boolean }>('Omit leaves some out');
assert.typeEqual<Exclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>('Exclude removes members of a union');
assert.typeEqual<Extract<string | number | boolean, number | boolean>, number | boolean>('Extract keeps them');
assert.typeEqual<NonNullable<string | null | undefined>, string>('NonNullable removes null and undefined');
assert.typeEqual<ReturnType<() => boolean>, boolean>('ReturnType, from a function type');
