// title: Indexed access
// intro: `T[K]` is the type of property `K` of `T`. With a union of keys it's a union of types, and `T[number]` is an array's item type.
interface Book {
  title: string;
  year: number;
  tags: string[];
}
expectTypeOf<Book['year']>().toEqualTypeOf<___>(); // one property
expectTypeOf<Book['title' | 'year']>().toEqualTypeOf<___>(); // several
expectTypeOf<Book['tags'][number]>().toEqualTypeOf<___>(); // an array's items
const sizes = ['s', 'm', 'l'] as const;
expectTypeOf<(typeof sizes)[number]>().toEqualTypeOf<___>(); // a union from a tuple
