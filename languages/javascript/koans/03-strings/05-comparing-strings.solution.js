expect('apple' < 'banana', 'strings compare like a dictionary').toBe(true);
expect('Zebra' < 'apple', 'but capitals come before lower case').toBe(true);
expect('10' < '9', 'character by character: 1 comes before 9').toBe(true);
expect('a'.codePointAt(0), 'the code point of a').toBe(97);
expect(String.fromCodePoint(65), 'a character from a code point').toBe('A');
expect(['b', 'a', 'C'].sort((x, y) => x.localeCompare(y, 'en')), 'localeCompare sorts the way a reader would').toEqual(['a', 'b', 'C']);
