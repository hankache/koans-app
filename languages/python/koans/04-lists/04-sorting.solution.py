words = ['pear', 'fig', 'apple']
assert sorted(words) == ['apple', 'fig', 'pear'], 'alphabetical'
assert sorted(words, key=len) == ['fig', 'pear', 'apple'], 'by length'
assert sorted([3, 1, 2], reverse=True) == [3, 2, 1], 'largest first'
assert words == ['pear', 'fig', 'apple'], 'sorted left the list alone'
assert words.sort() is None, 'sort works in place and returns None'
assert words == ['apple', 'fig', 'pear'], 'the list itself is sorted'
pairs = [('b', 2), ('a', 2), ('c', 1)]
assert sorted(pairs, key=lambda p: p[1]) == [('c', 1), ('b', 2), ('a', 2)], 'sorting is stable: ties keep their order'
