// title: Comparing strings
// intro: Strings compare character by character, by their code units, so capitals come before lower case and `'10'` comes before `'9'`. `localeCompare` compares the way a reader would.
expect('apple' < 'banana', 'strings compare like a dictionary').toBe(___);
expect('Zebra' < 'apple', 'but capitals come before lower case').toBe(___);
expect('10' < '9', 'character by character: 1 comes before 9').toBe(___);
expect('a'.codePointAt(0), 'the code point of a').toBe(___);
expect(String.fromCodePoint(65), 'a character from a code point').toBe(___);
expect(['b', 'a', 'C'].sort((x, y) => x.localeCompare(y, 'en')), 'localeCompare sorts the way a reader would').toEqual(___);
