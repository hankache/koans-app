a, b = 1, 2
a, b = b, a
assert_equal 2, a, 'swapping needs no temporary'
first, *rest = [1, 2, 3]
assert_equal [2, 3], rest, '* gathers the rest'
def total(*numbers) = numbers.sum
assert_equal 6, total(1, 2, 3), '*numbers gathers the arguments'
def greet(name:, greeting: 'Hello') = "#{greeting}, #{name}"
assert_equal 'Hello, Ada', greet(name: 'Ada'), 'keyword arguments, with a default'
def options(**opts) = opts
assert_equal({ a: 1 }, options(a: 1), '**opts gathers the keywords into a hash')
