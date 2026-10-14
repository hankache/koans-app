-- title: Strings
-- intro: `#` gives a string's length in bytes and `..` joins strings. Long brackets `[[…]]` make a string that takes everything literally, backslashes included.
assert.are.equal(___, #'hello', '# is the length')
assert.are.equal(___, 'hello' .. ' ' .. 'world', '.. joins')
assert.are.equal(___, #'a\nb', '\\n is one character')
assert.are.equal(___, #[[a\nb]], 'in long brackets, it is two')
assert.are.equal(___, string.rep('ab', 3), 'rep repeats')
