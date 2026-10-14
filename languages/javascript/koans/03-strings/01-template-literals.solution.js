const name = 'Ada';
assert.equal(`Hello, ${name}!`, 'Hello, Ada!', 'a template fills in a value');
assert.equal(`${1 + 2}`, '3', 'or any expression');
assert.equal(`${name.toUpperCase()}`, 'ADA', 'including method calls');
assert.equal("It's" === 'It\'s', true, 'two ways to write a quote inside quotes');
assert.equal(String.raw`a\nb`.length, 4, 'String.raw keeps backslashes as they are');
