# title: Truth
# intro: Only two values are false in Ruby: `false` and `nil`. Everything else is true, including `0` and the empty string.
assert_equal ___, !!true, 'true is true'
assert_equal ___, !!nil, 'nil counts as false'
assert_equal ___, !!0, 'zero counts as true'
assert_equal ___, !!'', 'so does the empty string'
assert_equal ___, !![], 'and an empty array'
assert_equal ___, (nil || 'default'), '|| picks the first true value'
