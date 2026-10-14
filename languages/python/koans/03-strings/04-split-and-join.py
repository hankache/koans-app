# title: Split and join
# intro: `split()` cuts a string into a list, and `join()` glues a list back into a string, with the string you call it on between the pieces.
assert_equal('a,b,c'.split(','), ___, 'split at commas')
assert_equal('  one  two '.split(), ___, 'with no argument, split at any whitespace')
assert_equal('-'.join(['x', 'y', 'z']), ___, 'join with a dash')
assert_equal(''.join(reversed('abc')), ___, 'join with nothing between')
assert_equal('ab' * 3, ___, 'repeat a string')
assert_equal(list('hi'), ___, 'a string is a sequence of characters')
