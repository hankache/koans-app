# title: Arithmetic
# intro: Dividing two integers gives an integer, rounded down. The remainder `%` takes the sign of the divisor. Use `fdiv`, or a float, for an exact quotient.
assert_equal ___, 7 / 2, 'integer division drops the fraction'
assert_equal ___, -7 / 2, 'it rounds down, toward minus infinity'
assert_equal ___, 7 % 3, '% is the remainder'
assert_equal ___, -7 % 3, 'with the sign of the divisor'
assert_equal ___, 7.fdiv(2), 'fdiv divides exactly'
assert_equal ___, 10.divmod(3), 'divmod gives both'
assert_equal ___, 2**10, '** is a power'
