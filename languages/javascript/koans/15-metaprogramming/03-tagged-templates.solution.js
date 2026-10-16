const tag = (strings, ...values) => ({ strings: [...strings], values });
const result = tag`a${1}b${2}c`;
expect(result.strings, 'the string parts').toEqual(['a', 'b', 'c']);
expect(result.values, 'and the values between them').toEqual([1, 2]);
expect(tag`${'x'}`.strings, 'there is always one more string than values').toEqual(['', '']);
const shout = (strings, ...values) => strings.reduce((out, s, i) => out + s + (i < values.length ? String(values[i]).toUpperCase() : ''), '');
expect(shout`hi ${'ada'}, bye ${'bob'}`, 'a tag can rewrite the values').toBe('hi ADA, bye BOB');
const raw = strings => strings.raw[0];
expect(raw`a\nb`, 'strings.raw keeps backslashes').toBe('a\\nb');
