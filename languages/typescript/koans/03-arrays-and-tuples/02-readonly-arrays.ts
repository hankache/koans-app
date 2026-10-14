// title: Readonly arrays
// intro: A `readonly T[]` (or `ReadonlyArray<T>`) has no methods that change it: no `push`, no `sort`. Methods that make new arrays are still there.
const days: readonly string[] = ['mon', 'tue'];
expectTypeOf(days).toEqualTypeOf<___>(); // two spellings again
expectTypeOf(days.map(d => d.length)).toEqualTypeOf<___>(); // map makes a new, ordinary array
expectTypeOf<string[]>().toExtend<___>(); // an array can be used as a readonly one
expectTypeOf<readonly string[]>().not.toExtend<___>(); // but not the other way round
expect(days.toSorted().reverse(), 'toSorted copies, so the copy can change').toEqual(___);
