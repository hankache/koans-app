def counter
  count = 0
  -> { count += 1 }
end
next_number = counter
next_number.call
assert_equal 2, next_number.call, 'the lambda keeps its count'
assert_equal 1, counter.call, 'each counter has its own'
adders = [1, 2, 3].map { |n| ->(x) { x + n } }
assert_equal 13, adders[2].call(10), 'each adder remembers its n'
x = 10
change = -> { x = 20 }
change.call
assert_equal 20, x, 'a block can change the variables around it'
