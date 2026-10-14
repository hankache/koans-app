# title: Sets
# intro: A set holds each value once, in no particular order. Its operators are the ones from mathematics: `|` union, `&` intersection, `-` difference.
a = {1, 2, 3}
b = {3, 4}
assert_equal(a | b, ___, 'union: in either')
assert_equal(a & b, ___, 'intersection: in both')
assert_equal(a - b, ___, 'difference: in a but not in b')
assert_equal(len({1, 1, 2}), ___, 'duplicates collapse')
assert_equal(2 in a, ___, 'membership is fast')
assert_equal(set('hello') == {'h', 'e', 'l', 'o'}, ___, 'a set of the letters')
