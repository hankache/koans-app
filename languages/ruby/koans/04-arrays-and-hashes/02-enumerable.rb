# title: Enumerable
# intro: `map`, `select`, `reject`, `sum`, `sort_by` and their friends come from `Enumerable`, so arrays, hashes and ranges all have them. `&:even?` is short for `{ |n| n.even? }`.
assert_equal ___, [1, 2, 3].map { |n| n * 2 }, 'map transforms each item'
assert_equal ___, [1, 2, 3, 4].select(&:even?), 'select keeps some'
assert_equal ___, [1, 2, 3, 4].reject(&:even?), 'reject leaves some out'
assert_equal ___, [1, 2, 3, 4].reduce(:+), 'reduce combines them'
assert_equal ___, %w[pear fig apple].sort_by(&:length), 'sort_by sorts by what the block gives'
assert_equal ___, [1, 1, 2].uniq, 'uniq drops duplicates'
assert_equal ___, [1, 2].zip([3, 4]), 'zip pairs items up'
