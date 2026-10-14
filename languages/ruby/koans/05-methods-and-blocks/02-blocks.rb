# title: Blocks
# intro: A method can take a block, the `{ … }` or `do … end` after its arguments, and run it with `yield`. `block_given?` asks whether there is one.
def with_five = yield(5)
assert_equal ___, with_five { |n| n * 2 }, 'yield passes values to the block'
def maybe = block_given? ? yield : 'no block'
assert_equal ___, maybe { 'a block' }, 'the block decides'
assert_equal ___, maybe, 'and without one'
log = []
[1, 2, 3].each { |n| log << n * 10 }
assert_equal ___, log, 'each runs the block once per item'
