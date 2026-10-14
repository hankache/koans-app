// title: Optional chaining and nullish
// intro: `?.` reads a property only if there is something to read it from. `??` supplies a default for `null` or `undefined`, and `??=`, `||=` and `&&=` assign only when they would.
const user = { profile: { name: 'Ada' } };
expect(user.profile?.name, '?. reads when it can').toBe(___);
expect(user.settings?.theme, 'and stops at a missing part').toBe(___);
expect(user.greet?.(), '?.() calls only if there is a function').toBe(___);
expect(user.settings?.theme ?? 'light', '?? gives a default').toBe(___);
const options = { size: 0 };
options.size ??= 10;
options.color ??= 'red';
expect(options, '??= assigns only to null or undefined').toEqual(___);
