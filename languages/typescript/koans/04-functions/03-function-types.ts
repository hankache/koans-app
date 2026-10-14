// title: Function types
// intro: `(a: A) => R` is the type of a function. Given a function type, TypeScript infers the parameters of an arrow function written for it.
type BinaryOp = (a: number, b: number) => number;
const multiply: BinaryOp = (a, b) => a * b;
assert.equal(multiply(3, 4), ___, 'a and b are inferred from BinaryOp');
assert.type<___>(multiply, 'the variable has the function type');
function apply(f: (n: number) => number, x: number): number {
  return f(x);
}
assert.equal(apply(n => n * n, 5), ___, 'so is n, from the parameter type');
const half = (n: number) => n / 2;
assert.typeEqual<typeof half, ___>('typeof gives a function value its type');
