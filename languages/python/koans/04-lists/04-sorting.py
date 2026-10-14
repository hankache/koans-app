# title: Sorting
# intro: `sorted()` returns a new sorted list and `.sort()` sorts a list where it stands. Both take `key`, a function that decides what to compare, and `reverse`.
words = ['pear', 'fig', 'apple']
assert sorted(words) == ___, 'alphabetical'
assert sorted(words, key=len) == ___, 'by length'
assert sorted([3, 1, 2], reverse=True) == ___, 'largest first'
assert words == ___, 'sorted left the list alone'
assert words.sort() is ___, 'sort works in place and returns None'
assert words == ___, 'the list itself is sorted'
pairs = [('b', 2), ('a', 2), ('c', 1)]
assert sorted(pairs, key=lambda p: p[1]) == ___, 'sorting is stable: ties keep their order'
