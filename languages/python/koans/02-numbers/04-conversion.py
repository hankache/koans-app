# title: Conversion
# intro: `int()`, `float()` and `str()` turn values into another type. `round()` rounds halves to the even neighbor.
assert int('42') == ___, 'a string of digits to an int'
assert float('2.5') == ___, 'a string to a float'
assert int(3.99) == ___, 'int() drops the fraction'
assert int(-3.99) == ___, 'toward zero'
assert str(7) == ___, 'a number to a string'
assert round(2.5) == ___, 'a half rounds to the even neighbor'
assert round(3.14159, 2) == ___, 'round to some decimals'
assert int('ff', 16) == ___, 'int() reads other bases too'
