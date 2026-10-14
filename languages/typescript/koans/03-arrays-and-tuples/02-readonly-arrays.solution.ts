const days: readonly string[] = ['mon', 'tue'];
expectTypeOf(days).toEqualTypeOf<ReadonlyArray<string>>(); // two spellings again
expectTypeOf(days.map(d => d.length)).toEqualTypeOf<number[]>(); // map makes a new, ordinary array
expectTypeOf<string[]>().toExtend<readonly string[]>(); // an array can be used as a readonly one
expectTypeOf<readonly string[]>().not.toExtend<string[]>(); // but not the other way round
expect(days.toSorted().reverse(), 'toSorted copies, so the copy can change').toEqual(['tue', 'mon']);
