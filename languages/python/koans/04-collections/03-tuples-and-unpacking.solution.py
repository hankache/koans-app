point = (3, 4)
x, y = point
assert_equal(x, 3, 'unpacking takes the items in order')
first, *rest = [1, 2, 3]
assert_equal(rest, [2, 3], 'the starred name takes the rest, as a list')
a, b = 1, 2
a, b = b, a
assert_equal(a, 2, 'swapping two values needs no temporary')
assert_is(type((1,)), tuple, 'the comma makes a tuple')
assert_equal((1), 1, 'parentheses alone do not')
