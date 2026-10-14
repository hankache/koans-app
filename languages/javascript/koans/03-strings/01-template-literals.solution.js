const name = 'Ada';
expect(`Hello, ${name}!`, 'a template fills in a value').toBe('Hello, Ada!');
expect(`${1 + 2}`, 'or any expression').toBe('3');
const twoLines = `a
b`;
expect(twoLines.length, 'a template can span lines').toBe(3);
expect("It's" === 'It\'s', 'two ways to write a quote inside quotes').toBe(true);
expect(String.raw`a\nb`.length, 'String.raw keeps backslashes as they are').toBe(4);
