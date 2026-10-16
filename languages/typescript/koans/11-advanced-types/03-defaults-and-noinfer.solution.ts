type Box<T = string> = { value: T };
const box: Box = { value: 'hi' };
expectTypeOf(box.value).toEqualTypeOf<string>(); // a default fills a missing type argument
function first<T = number>(items?: T[]): T | undefined {
  return items?.[0];
}
const nothing = first();
expectTypeOf(nothing).toEqualTypeOf<number | undefined>(); // nothing to infer from: the default
expectTypeOf(first(['a'])).toEqualTypeOf<string | undefined>(); // inference wins over the default
function choose<const T extends string>(options: T[], chosen: T) {
  return chosen;
}
expectTypeOf(choose(['red', 'green'], 'blue')).toEqualTypeOf<'red' | 'green' | 'blue'>(); // every argument helps infer T
function chooseStrict<const T extends string>(options: T[], chosen: NoInfer<T>) {
  return chosen;
}
expectTypeOf(chooseStrict(['red', 'green'], 'red')).toEqualTypeOf<'red' | 'green'>(); // with NoInfer, only options decide
