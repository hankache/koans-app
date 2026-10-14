// title: let and const
// intro: `let` declares a variable you can reassign; `const` one you can't. A `const` object can still change inside: the name is fixed, not the value.
let count = 1;
count += 1;
expect(count, 'let can be reassigned').toBe(___);
const limit = 10;
expect(() => { limit = 20; }, 'const cannot').toThrow(___);
const settings = { theme: 'light' };
settings.theme = 'dark';
expect(settings.theme, 'but a const object can change inside').toBe(___);
