assert_equal [[1, 2], [3]], [1, 2, 3].each_slice(2).to_a, 'each_slice cuts into groups'
assert_equal [3, 5, 7], [1, 2, 3, 4].each_cons(2).map(&:sum), 'each_cons slides along'
assert_equal [[4, 0], [5, 1]], [4, 5].each_with_index.to_a, 'each_with_index pairs items with positions'
assert_equal [2, 4, 6], (1..Float::INFINITY).lazy.map { |n| n * 2 }.first(3), 'lazy works on an endless range'
items = [1, 2].each
assert_equal 1, items.next, 'next steps through'
assert_equal 2, items.next, 'one at a time'
assert_raises(StopIteration) { items.next }
