# title: Comparison
# intro: Comparisons give `True` or `False`, and they chain: `1 < x < 3` checks both sides at once.
assert_equal(3 < 5, ___, 'less than')
assert_equal(1 < 2 < 3, ___, 'comparisons chain')
assert_equal(3 < 2 < 4, ___, 'and every link must hold')
assert_equal(5 == 5.0, ___, 'an int equals the float with the same value')
assert_equal(max(3, 7, 1), ___, 'the largest')
assert_equal(min(3, 7, 1), ___, 'the smallest')
assert_equal(abs(-4), ___, 'distance from zero')
