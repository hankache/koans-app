assert_equal 42, '42abc'.to_i, 'to_i reads as far as it can'
assert_equal 0, 'abc'.to_i, 'and gives 0 when it reads nothing'
assert_equal 42, Integer('42'), 'Integer() wants the whole string'
assert_raises(ArgumentError) { Integer('abc') }
assert_equal 3, 3.7.to_i, 'to_i drops the fraction'
assert_equal 4, 3.7.round, 'round rounds'
assert_equal '11111111', 255.to_s(2), 'to_s takes a base'
assert_equal 10, '1010'.to_i(2), 'and so does to_i'
