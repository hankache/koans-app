numbers = [1, 2, 3]
numbers << 4
assert_equal [1, 2, 3, 4], numbers, '<< adds to the end'
assert_equal 1, numbers.first, 'first'
assert_equal 4, numbers.pop, 'pop removes and returns the last item'
assert_equal 3, numbers.length, 'length counts the items'
assert_equal true, numbers.include?(2), 'include? looks for a value'
assert_equal [0, 0, 0], Array.new(3, 0), 'Array.new fills an array'
