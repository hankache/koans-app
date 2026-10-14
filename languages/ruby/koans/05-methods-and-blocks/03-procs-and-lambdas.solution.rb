square = ->(n) { n * n }
assert_equal 9, square.call(3), 'call a lambda'
assert_equal 16, square.(4), '.() is the same'
assert_equal true, square.lambda?, 'it is a lambda'
assert_raises(ArgumentError) { square.call(1, 2) }
add = proc { |a, b| (a || 0) + (b || 0) }
assert_equal 1, add.call(1), 'a proc fills missing arguments with nil'
assert_equal ['A', 'B'], %w[a b].map(&:upcase), '& turns a symbol into a block'
