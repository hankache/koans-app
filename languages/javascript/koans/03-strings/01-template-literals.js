// title: Template literals
// intro: Backquotes make a template literal: anything in `${}` is computed and put into the string, and a template can span lines. Single and double quotes make the same strings.
const name = 'Ada';
expect(`Hello, ${name}!`, 'a template fills in a value').toBe(___);
expect(`${1 + 2}`, 'or any expression').toBe(___);
const twoLines = `a
b`;
expect(twoLines.length, 'a template can span lines').toBe(___);
expect("It's" === 'It\'s', 'two ways to write a quote inside quotes').toBe(___);
expect(String.raw`a\nb`.length, 'String.raw keeps backslashes as they are').toBe(___);
