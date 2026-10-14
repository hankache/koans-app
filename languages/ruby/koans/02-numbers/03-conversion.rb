# title: Conversion
# intro: `to_i` and `to_f` read what they can and never complain; `Integer()` and `Float()` want the whole string, and raise if they don't get it.
assert_equal ___, '42abc'.to_i, 'to_i reads as far as it can'
assert_equal ___, 'abc'.to_i, 'and gives 0 when it reads nothing'
assert_equal ___, Integer('42'), 'Integer() wants the whole string'
assert_raises(___) { Integer('abc') }
assert_equal ___, 3.7.to_i, 'to_i drops the fraction'
assert_equal ___, 3.7.round, 'round rounds'
assert_equal ___, 255.to_s(2), 'to_s takes a base'
assert_equal ___, '1010'.to_i(2), 'and so does to_i'
