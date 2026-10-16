// title: Defaults and NoInfer
// intro: A type parameter can have a default, used when nothing is given or inferred. A `const` type parameter keeps literal types, and `NoInfer<T>` marks a place that must not be used to infer `T`.
type Box<T = string> = { value: T };
const box: Box = { value: 'hi' };
expectTypeOf(box.value).toEqualTypeOf<___>(); // a default fills a missing type argument
function first<T = number>(items?: T[]): T | undefined {
  return items?.[0];
}
const nothing = first();
expectTypeOf(nothing).toEqualTypeOf<___>(); // nothing to infer from: the default
expectTypeOf(first(['a'])).toEqualTypeOf<___>(); // inference wins over the default
function choose<const T extends string>(options: T[], chosen: T) {
  return chosen;
}
expectTypeOf(choose(['red', 'green'], 'blue')).toEqualTypeOf<___>(); // every argument helps infer T
function chooseStrict<const T extends string>(options: T[], chosen: NoInfer<T>) {
  return chosen;
}
expectTypeOf(chooseStrict(['red', 'green'], 'red')).toEqualTypeOf<___>(); // with NoInfer, only options decide
