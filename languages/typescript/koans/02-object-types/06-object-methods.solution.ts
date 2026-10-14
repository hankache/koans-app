const box = {
  items: [] as string[],
  add(item: string) {
    this.items.push(item);
    return this.items.length;
  },
};
expectTypeOf(box.add).returns.toEqualTypeOf<number>(); // a method's result is inferred
expect(box.add('pen'), 'the count after adding').toBe(1);
const point = { x: 1, y: 2 };
expectTypeOf(Object.keys(point)).toEqualTypeOf<string[]>(); // Object.keys gives plain strings
expectTypeOf(Object.entries(point)).toEqualTypeOf<[string, number][]>(); // entries keep the values' type
