const calls: string[] = [];
function logged<This, Args extends unknown[], R>(original: (this: This, ...args: Args) => R, context: ClassMethodDecoratorContext) {
  return function (this: This, ...args: Args): R {
    calls.push(`${String(context.name)}(${args.join(', ')})`);
    return original.apply(this, args);
  };
}
function doubled(_: undefined, context: ClassFieldDecoratorContext) {
  return (initial: number) => initial * 2;
}
class Calculator {
  @doubled size = 21;
  @logged
  add(a: number, b: number) {
    return a + b;
  }
}
const calc = new Calculator();
expect(calc.add(2, 3), 'the wrapped method still works').toBe(5);
expect(calls, 'and the decorator logged it').toEqual(['add(2, 3)']);
expect(calc.size, 'a field decorator can change the first value').toBe(42);
