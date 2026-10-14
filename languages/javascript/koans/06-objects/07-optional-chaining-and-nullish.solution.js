const user = { profile: { name: 'Ada' } };
expect(user.profile?.name, '?. reads when it can').toBe('Ada');
expect(user.settings?.theme, 'and stops at a missing part').toBe(undefined);
expect(user.greet?.(), '?.() calls only if there is a function').toBe(undefined);
expect(user.settings?.theme ?? 'light', '?? gives a default').toBe('light');
const options = { size: 0 };
options.size ??= 10;
options.color ??= 'red';
expect(options, '??= assigns only to null or undefined').toEqual({ size: 0, color: 'red' });
