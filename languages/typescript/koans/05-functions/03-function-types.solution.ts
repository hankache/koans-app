type BinaryOp = (a: number, b: number) => number;
const ops: Record<string, BinaryOp> = {
  add: (a, b) => a + b,
  mul: (a, b) => a * b,
};
expect(ops.mul(3, 4), 'parameters are typed by the function type').toBe(12);
const handler: () => void = () => 42;
expect(handler(), 'void means the result is ignored, not that there is none').toBe(42);
const shorter: BinaryOp = a => a;
expect(shorter(5, 9), 'a function may take fewer parameters than its type').toBe(5);
expectTypeOf<Parameters<BinaryOp>>().toEqualTypeOf<[a: number, b: number]>(); // Parameters<F> is a tuple
