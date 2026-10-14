# title: Types
# intro: `type()` tells you what a value is. `isinstance()` asks whether a value is of a type, including the types it is built on.
assert type(42) is ___, 'a whole number'
assert type(4.2) is ___, 'a number with a point'
assert type('42') is ___, 'quotes make a string'
assert type(True) is ___, 'True and False'
assert type([]) is ___, 'square brackets make a list'
assert isinstance(True, ___), 'a bool is a kind of int'
assert isinstance(3, (int, ___)), 'isinstance takes a tuple of types too'
