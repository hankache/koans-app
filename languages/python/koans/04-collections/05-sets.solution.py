a = {1, 2, 3}
b = {3, 4}
assert_equal(a | b, {1, 2, 3, 4}, 'union: in either')
assert_equal(a & b, {3}, 'intersection: in both')
assert_equal(a - b, {1, 2}, 'difference: in a but not in b')
assert_equal(len({1, 1, 2}), 2, 'duplicates collapse')
assert_equal(2 in a, True, 'membership is fast')
assert_equal(set('hello') == {'h', 'e', 'l', 'o'}, True, 'a set of the letters')
