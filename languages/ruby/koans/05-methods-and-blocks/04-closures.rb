# title: Closures
# intro: Blocks and lambdas keep the variables around them, and can change them, even after the method that made them has returned.
def counter
  count = 0
  -> { count += 1 }
end
next_number = counter
next_number.call
assert_equal ___, next_number.call, 'the lambda keeps its count'
assert_equal ___, counter.call, 'each counter has its own'
adders = [1, 2, 3].map { |n| ->(x) { x + n } }
assert_equal ___, adders[2].call(10), 'each adder remembers its n'
x = 10
change = -> { x = 20 }
change.call
assert_equal ___, x, 'a block can change the variables around it'
