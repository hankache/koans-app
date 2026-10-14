// title: any and unknown
// intro: `any` switches type checking off. `unknown` means "could be anything" too, but you must check what it is before using it, which makes it the safe choice.
const parsed = JSON.parse('{"n": 1}');
expectTypeOf(parsed).toEqualTypeOf<___>(); // JSON.parse cannot know, so it says any
const value: unknown = 'text';
let length = 0;
if (typeof value === 'string') {
  length = value.length;
}
expect(length, 'after a check, an unknown can be used').toBe(___);
const anything: any = 'text';
expect(() => anything.toFixed(), 'any lets mistakes through to run time').toThrow(___);
