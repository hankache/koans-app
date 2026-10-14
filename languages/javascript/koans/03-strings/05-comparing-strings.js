// title: Comparing strings
// intro: Strings compare character by character, by their code points, so capitals come before lower case and `'10'` comes before `'9'`.
assert.equal('apple' < 'banana', ___, 'strings compare like a dictionary');
assert.equal('Zebra' < 'apple', ___, 'but capitals come before lower case');
assert.equal('10' < '9', ___, 'character by character: 1 comes before 9');
assert.equal(10 < 9, ___, 'numbers compare as numbers');
assert.equal('a'.codePointAt(0), ___, 'the code point of a');
assert.equal(String.fromCodePoint(65), ___, 'and a character from a code point');
