# title: Division
# intro: `/` always gives a float. `//` divides and rounds down, `%` gives the remainder, and `divmod()` gives both at once.
assert_equal(7 / 2, ___, '/ gives a float')
assert_equal(6 / 3, ___, 'even when it divides exactly')
assert_equal(7 // 2, ___, '// rounds down')
assert_equal(-7 // 2, ___, 'down means toward minus infinity, not toward zero')
assert_equal(7 % 2, ___, '% is the remainder')
assert_equal(divmod(17, 5), ___, 'divmod gives quotient and remainder')
