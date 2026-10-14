let count = 1;
count += 1;
expect(count, 'let can be reassigned').toBe(2);
const limit = 10;
expect(() => { limit = 20; }, 'const cannot').toThrow(TypeError);
const settings = { theme: 'light' };
settings.theme = 'dark';
expect(settings.theme, 'but a const object can change inside').toBe('dark');
