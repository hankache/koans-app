# title: Types
# intro: `type()` tells you what a value is. `isinstance()` asks whether a value is of a type, including the types it is built on.
assert_is(type(42), ___, 'a whole number')
assert_is(type(4.2), ___, 'a number with a point')
assert_is(type('42'), ___, 'quotes make a string')
assert_is(type(True), ___, 'True and False')
assert_is(type([]), ___, 'square brackets make a list')
assert_is_instance(True, ___, 'a bool is a kind of int')
