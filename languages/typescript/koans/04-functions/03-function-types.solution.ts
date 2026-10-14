type BinaryOp = (a: number, b: number) => number;
const multiply: BinaryOp = (a, b) => a * b;
assert.equal(multiply(3, 4), 12, 'a and b are inferred from BinaryOp');
assert.type<BinaryOp>(multiply, 'the variable has the function type');
function apply(f: (n: number) => number, x: number): number {
  return f(x);
}
assert.equal(apply(n => n * n, 5), 25, 'so is n, from the parameter type');
const half = (n: number) => n / 2;
assert.typeEqual<typeof half, (n: number) => number>('typeof gives a function value its type');
