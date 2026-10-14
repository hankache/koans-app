// title: Parameters and results
// intro: Parameters need types; results are inferred, or annotated to make sure the function returns what you meant.
function area(width: number, height: number): number {
  return width * height;
}
expect(area(3, 4), 'call it as usual').toBe(___);
expectTypeOf(area).parameter(1).toEqualTypeOf<___>(); // the second parameter
expectTypeOf(area).toEqualTypeOf<___>(); // its whole type
const shout = (s: string) => s.toUpperCase() + '!';
expectTypeOf(shout).returns.toEqualTypeOf<___>(); // an inferred result
