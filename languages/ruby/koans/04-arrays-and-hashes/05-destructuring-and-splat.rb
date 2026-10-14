# title: Destructuring and splat
# intro: Assigning to several names takes an array apart. `*` gathers the rest into an array, and in a method's parameters `*args` and `**options` gather extra arguments.
a, b = 1, 2
a, b = b, a
assert_equal ___, a, 'swapping needs no temporary'
first, *rest = [1, 2, 3]
assert_equal ___, rest, '* gathers the rest'
def total(*numbers) = numbers.sum
assert_equal ___, total(1, 2, 3), '*numbers gathers the arguments'
def greet(name:, greeting: 'Hello') = "#{greeting}, #{name}"
assert_equal ___, greet(name: 'Ada'), 'keyword arguments, with a default'
def options(**opts) = opts
assert_equal(___, options(a: 1), '**opts gathers the keywords into a hash')
