# title: Arrays
# intro: An array holds values in order. `<<` adds to its end and `pop` takes from it; `first` and `last` read its ends.
numbers = [1, 2, 3]
numbers << 4
assert_equal ___, numbers, '<< adds to the end'
assert_equal ___, numbers.first, 'first'
assert_equal ___, numbers.pop, 'pop removes and returns the last item'
assert_equal ___, numbers.length, 'length counts the items'
assert_equal ___, numbers.include?(2), 'include? looks for a value'
assert_equal ___, Array.new(3, 0), 'Array.new fills an array'
