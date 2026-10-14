# title: Truth
# intro: Any value can be asked whether it's true with `bool()`. Zero, empty things and `None` are false; almost everything else is true.
assert_equal(bool(0), ___, 'zero is false')
assert_equal(bool(42), ___, 'other numbers are true')
assert_equal(bool(''), ___, 'the empty string is false')
assert_equal(bool('0'), ___, 'a string with something in it is true, even "0"')
assert_equal(bool([]), ___, 'an empty list is false')
assert_equal(bool(None), ___, 'None is false')
assert_equal(not None, ___, 'not turns false into True')
