# title: Procs and lambdas
# intro: A block can be kept as an object: a lambda, written `->(x) { … }`, or a proc. Call it with `call`, `.()` or `[]`. Lambdas insist on the right number of arguments; procs don't.
square = ->(n) { n * n }
assert_equal ___, square.call(3), 'call a lambda'
assert_equal ___, square.(4), '.() is the same'
assert_equal ___, square.lambda?, 'it is a lambda'
assert_raises(___) { square.call(1, 2) }
add = proc { |a, b| (a || 0) + (b || 0) }
assert_equal ___, add.call(1), 'a proc fills missing arguments with nil'
assert_equal ___, %w[a b].map(&:upcase), '& turns a symbol into a block'
