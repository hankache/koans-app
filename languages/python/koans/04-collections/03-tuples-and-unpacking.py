# title: Tuples and unpacking
# intro: A tuple is a list that cannot change. Unpacking assigns a sequence's items to several names at once, and a starred name takes whatever is left.
point = (3, 4)
x, y = point
assert_equal(x, ___, 'unpacking takes the items in order')
first, *rest = [1, 2, 3]
assert_equal(rest, ___, 'the starred name takes the rest, as a list')
a, b = 1, 2
a, b = b, a
assert_equal(a, ___, 'swapping two values needs no temporary')
assert_is(type((1,)), ___, 'the comma makes a tuple')
assert_equal((1), ___, 'parentheses alone do not')
