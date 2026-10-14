# title: Enumerators
# intro: Called without a block, `each` and its friends return an enumerator: a sequence you can step through with `next`, chain, or make lazy, even when it never ends.
assert_equal ___, [1, 2, 3].each_slice(2).to_a, 'each_slice cuts into groups'
assert_equal ___, [1, 2, 3, 4].each_cons(2).map(&:sum), 'each_cons slides along'
assert_equal ___, [4, 5].each_with_index.to_a, 'each_with_index pairs items with positions'
assert_equal ___, (1..Float::INFINITY).lazy.map { |n| n * 2 }.first(3), 'lazy works on an endless range'
items = [1, 2].each
assert_equal ___, items.next, 'next steps through'
assert_equal ___, items.next, 'one at a time'
assert_raises(___) { items.next }
