# title: Big and small
# intro: Python's integers have no size limit. Floats are binary approximations, so `0.1` is not quite one tenth: compare them with care.
assert_equal(2 ** 100, ___, 'integers grow as large as needed')
assert_equal(0.1 + 0.2 == 0.3, ___, 'floats are approximations')
assert_equal(round(0.1 + 0.2, 10), ___, 'round them before comparing')
assert_equal(1_000_000, ___, 'underscores group digits')
assert_equal(0b1010, ___, '0b starts a binary number')
assert_equal(0xff, ___, '0x starts a hexadecimal one')
