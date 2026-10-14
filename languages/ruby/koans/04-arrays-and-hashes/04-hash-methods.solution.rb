prices = { tea: 3, cake: 5 }
assert_equal({ tea: 30, cake: 50 }, prices.transform_values { |p| p * 10 }, 'transform_values changes every value')
assert_equal({ cake: 5 }, prices.select { |_, p| p > 4 }, 'select keeps some pairs')
assert_equal({ 'tea' => 3, 'cake' => 5 }, prices.to_h { |k, p| [k.to_s, p] }, 'to_h with a block rebuilds the pairs')
words = %w[apple avocado banana]
assert_equal({ 'a' => ['apple', 'avocado'], 'b' => ['banana'] }, words.group_by { |w| w[0] }, 'group_by groups by what the block gives')
assert_equal({ 'a' => 2, 'b' => 1 }, %w[a b a].tally, 'tally counts')
