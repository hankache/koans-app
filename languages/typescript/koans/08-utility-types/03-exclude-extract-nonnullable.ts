// title: Exclude, Extract and NonNullable
// intro: These filter a union: `Exclude` removes members that fit a type, `Extract` keeps only those, and `NonNullable` removes `null` and `undefined`.
type Status = 'idle' | 'loading' | 'done' | 'error';
expectTypeOf<Exclude<Status, 'idle'>>().toEqualTypeOf<___>(); // remove some
expectTypeOf<Extract<Status, 'done' | 'error' | 'other'>>().toEqualTypeOf<___>(); // keep the ones that fit
expectTypeOf<NonNullable<string | null | undefined>>().toEqualTypeOf<___>(); // no null or undefined
expectTypeOf<Extract<string | number | (() => void), Function>>().toEqualTypeOf<___>(); // by shape, not just literals
