# title: Truth
# intro: Any value can be asked whether it's true. Zero, empty things and `None` are false; almost everything else is true.
assert bool(0) == ___, 'zero is false'
assert bool(42) == ___, 'other numbers are true'
assert bool('') == ___, 'the empty string is false'
assert bool('0') == ___, 'a string with something in it is true, even "0"'
assert bool([]) == ___, 'an empty list is false'
assert bool(None) == ___, 'None is false'
assert (not []) is ___, 'not turns a false value into True'
