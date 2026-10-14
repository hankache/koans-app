function area(width: number, height: number): number {
  return width * height;
}
expect(area(3, 4), 'call it as usual').toBe(12);
expectTypeOf(area).parameter(1).toEqualTypeOf<number>(); // the second parameter
expectTypeOf(area).toEqualTypeOf<(width: number, height: number) => number>(); // its whole type
const shout = (s: string) => s.toUpperCase() + '!';
expectTypeOf(shout).returns.toEqualTypeOf<string>(); // an inferred result
