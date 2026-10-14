// title: Function types
// intro: A function type, `(x: A) => B`, describes a callback or a variable holding a function. A callback that returns `void` may return anything; its result is just ignored.
type BinaryOp = (a: number, b: number) => number;
const ops: Record<string, BinaryOp> = {
  add: (a, b) => a + b,
  mul: (a, b) => a * b,
};
expect(ops.mul(3, 4), 'parameters are typed by the function type').toBe(___);
const handler: () => void = () => 42;
expect(handler(), 'void means the result is ignored, not that there is none').toBe(___);
const shorter: BinaryOp = a => a;
expect(shorter(5, 9), 'a function may take fewer parameters than its type').toBe(___);
expectTypeOf<Parameters<BinaryOp>>().toEqualTypeOf<___>(); // Parameters<F> is a tuple
