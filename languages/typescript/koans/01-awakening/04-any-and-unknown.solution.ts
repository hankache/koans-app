const parsed = JSON.parse('{"n": 1}');
expectTypeOf(parsed).toEqualTypeOf<any>(); // JSON.parse cannot know, so it says any
const value: unknown = 'text';
let length = 0;
if (typeof value === 'string') {
  length = value.length;
}
expect(length, 'after a check, an unknown can be used').toBe(4);
const anything: any = 'text';
expect(() => anything.toFixed(), 'any lets mistakes through to run time').toThrow(TypeError);
