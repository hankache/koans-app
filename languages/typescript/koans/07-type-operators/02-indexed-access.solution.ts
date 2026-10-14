interface Book {
  title: string;
  year: number;
  tags: string[];
}
expectTypeOf<Book['year']>().toEqualTypeOf<number>(); // one property
expectTypeOf<Book['title' | 'year']>().toEqualTypeOf<string | number>(); // several
expectTypeOf<Book['tags'][number]>().toEqualTypeOf<string>(); // an array's items
const sizes = ['s', 'm', 'l'] as const;
expectTypeOf<(typeof sizes)[number]>().toEqualTypeOf<'s' | 'm' | 'l'>(); // a union from a tuple
