assert.equal('apple' < 'banana', true, 'strings compare like a dictionary');
assert.equal('Zebra' < 'apple', true, 'but capitals come before lower case');
assert.equal('10' < '9', true, 'character by character: 1 comes before 9');
assert.equal(10 < 9, false, 'numbers compare as numbers');
assert.equal('a'.codePointAt(0), 97, 'the code point of a');
assert.equal(String.fromCodePoint(65), 'A', 'and a character from a code point');
