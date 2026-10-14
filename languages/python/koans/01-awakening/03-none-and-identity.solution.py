def nothing():
    pass

assert_is(nothing(), None, 'a function that returns nothing returns None')
a = [1, 2]
b = [1, 2]
c = a
assert_equal(a == b, True, 'a and b are equal lists')
assert_equal(a is b, False, 'but they are two separate lists')
assert_equal(a is c, True, 'c is another name for the list a names')
c.append(3)
assert_equal(a, [1, 2, 3], 'so changing c changes a')
