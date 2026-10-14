# title: Comparing strings
# intro: `in` looks for a substring. Strings compare character by character, by their Unicode code points: `ord()` gives a character's number and `chr()` turns it back.
assert 'ell' in 'hello', 'in finds a substring'
assert ('apple' < 'banana') == ___, 'strings compare like a dictionary'
assert ('Zebra' < 'apple') == ___, 'but capitals come before lower case'
assert ('a' == 'A') == ___, 'case matters'
assert 'Straße'.casefold() == ___, 'casefold for comparing without case'
assert ord('A') == ___, 'the code point of A'
assert chr(97) == ___, 'and back from a code point'
