// title: Object methods
// intro: Methods are typed like any property. `Object.keys` returns `string[]`, not the object's keys, because an object may always have more properties than its type says.
const box = {
  items: [] as string[],
  add(item: string) {
    this.items.push(item);
    return this.items.length;
  },
};
expectTypeOf(box.add).returns.toEqualTypeOf<___>(); // a method's result is inferred
expect(box.add('pen'), 'the count after adding').toBe(___);
const point = { x: 1, y: 2 };
expectTypeOf(Object.keys(point)).toEqualTypeOf<___>(); // Object.keys gives plain strings
expectTypeOf(Object.entries(point)).toEqualTypeOf<___>(); // entries keep the values' type
