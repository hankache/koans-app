# title: Split and join
# intro: `split()` cuts a string into a list, and `join()` glues a list back into a string, with the string you call it on between the pieces.
assert 'a,b,c'.split(',') == ___, 'split at commas'
assert '  one  two '.split() == ___, 'with no argument, split at any whitespace'
assert 'a,b,c'.split(',', 1) == ___, 'at most one split'
assert '-'.join(['x', 'y', 'z']) == ___, 'join with a dash'
assert ''.join(reversed('abc')) == ___, 'join with nothing between'
assert 'ab' * 3 == ___, 'repeat a string'
assert 'one\ntwo'.splitlines() == ___, 'splitlines cuts at line breaks'
