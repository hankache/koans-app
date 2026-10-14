def with_five = yield(5)
assert_equal 10, with_five { |n| n * 2 }, 'yield passes values to the block'
def maybe = block_given? ? yield : 'no block'
assert_equal 'a block', maybe { 'a block' }, 'the block decides'
assert_equal 'no block', maybe, 'and without one'
log = []
[1, 2, 3].each { |n| log << n * 10 }
assert_equal [10, 20, 30], log, 'each runs the block once per item'
