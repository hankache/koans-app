# title: None and identity
# intro: `None` means "no value". `==` asks whether two values are equal; `is` asks whether they are the very same object, which is also how you check for `None`.
def nothing():
    pass

assert_is(nothing(), ___, 'a function that returns nothing returns None')
a = [1, 2]
b = [1, 2]
c = a
assert_equal(a == b, ___, 'a and b are equal lists')
assert_equal(a is b, ___, 'but they are two separate lists')
assert_equal(a is c, ___, 'c is another name for the list a names')
c.append(3)
assert_equal(a, ___, 'so changing c changes a')
