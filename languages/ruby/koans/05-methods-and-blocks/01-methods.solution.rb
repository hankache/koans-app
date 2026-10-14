def double(n) = n * 2
assert_equal 8, double(4), 'a one-line method'
def describe(n)
  if n.zero? then 'zero' else 'something' end
end
assert_equal 'zero', describe(0), 'the last expression is the result'
def greet(name = 'world') = "Hello, #{name}"
assert_equal 'Hello, world', greet, 'a default fills in a missing argument'
assert_equal true, 4.even?, 'a ? method answers a question'
assert_raises(ArgumentError) { double }
