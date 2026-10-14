// title: Template literals
// intro: Backquotes make a template literal: anything in `${}` is computed and put into the string. Single and double quotes make the same strings.
const name = 'Ada';
assert.equal(`Hello, ${name}!`, ___, 'a template fills in a value');
assert.equal(`${1 + 2}`, ___, 'or any expression');
assert.equal(`${name.toUpperCase()}`, ___, 'including method calls');
assert.equal("It's" === 'It\'s', ___, 'two ways to write a quote inside quotes');
assert.equal(String.raw`a\nb`.length, ___, 'String.raw keeps backslashes as they are');
