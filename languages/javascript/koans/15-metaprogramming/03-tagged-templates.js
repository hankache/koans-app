// title: Tagged templates
// intro: A function written before a template literal is a tag: it gets the template's string parts and its values separately, and returns whatever it likes.
const tag = (strings, ...values) => ({ strings: [...strings], values });
const result = tag`a${1}b${2}c`;
expect(result.strings, 'the string parts').toEqual(___);
expect(result.values, 'and the values between them').toEqual(___);
expect(tag`${'x'}`.strings, 'there is always one more string than values').toEqual(___);
const shout = (strings, ...values) => strings.reduce((out, s, i) => out + s + (i < values.length ? String(values[i]).toUpperCase() : ''), '');
expect(shout`hi ${'ada'}, bye ${'bob'}`, 'a tag can rewrite the values').toBe(___);
const raw = strings => strings.raw[0];
expect(raw`a\nb`, 'strings.raw keeps backslashes').toBe(___);
