# title: Division
# intro: `/` always gives a float. `//` divides and rounds down, `%` gives the remainder, and `divmod()` gives both at once.
assert 7 / 2 == ___, '/ gives a float'
assert 6 / 3 == ___, 'even when it divides exactly'
assert 7 // 2 == ___, '// rounds down'
assert -7 // 2 == ___, 'down means toward minus infinity, not toward zero'
assert 7 % 2 == ___, '% is the remainder'
assert -7 % 3 == ___, 'it takes the sign of the divisor'
assert divmod(17, 5) == ___, 'divmod gives quotient and remainder'
