type Status = 'idle' | 'loading' | 'done' | 'error';
expectTypeOf<Exclude<Status, 'idle'>>().toEqualTypeOf<'loading' | 'done' | 'error'>(); // remove some
expectTypeOf<Extract<Status, 'done' | 'error' | 'other'>>().toEqualTypeOf<'done' | 'error'>(); // keep the ones that fit
expectTypeOf<NonNullable<string | null | undefined>>().toEqualTypeOf<string>(); // no null or undefined
expectTypeOf<Extract<string | number | (() => void), Function>>().toEqualTypeOf<() => void>(); // by shape, not just literals
