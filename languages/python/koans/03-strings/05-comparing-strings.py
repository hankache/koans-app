# title: Comparing strings
# intro: `in` looks for a substring. Strings compare character by character, by their Unicode code points: `ord()` gives a character's number and `chr()` turns it back.
assert_equal('ell' in 'hello', ___, 'in finds a substring')
assert_equal('apple' < 'banana', ___, 'strings compare like a dictionary')
assert_equal('Zebra' < 'apple', ___, 'but capitals come before lower case')
assert_equal('a' == 'A', ___, 'case matters')
assert_equal(ord('A'), ___, 'the code point of A')
assert_equal(chr(97), ___, 'and back from a code point')
