# title: Hash methods
# intro: Hashes have `Enumerable` methods too, each block getting a key and a value; `group_by` and `tally` build hashes from arrays.
prices = { tea: 3, cake: 5 }
assert_equal(___, prices.transform_values { |p| p * 10 }, 'transform_values changes every value')
assert_equal(___, prices.select { |_, p| p > 4 }, 'select keeps some pairs')
assert_equal(___, prices.to_h { |k, p| [k.to_s, p] }, 'to_h with a block rebuilds the pairs')
words = %w[apple avocado banana]
assert_equal(___, words.group_by { |w| w[0] }, 'group_by groups by what the block gives')
assert_equal(___, %w[a b a].tally, 'tally counts')
