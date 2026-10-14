# title: Methods
# intro: A method returns its last expression. Parameters can have defaults, names can end in `?` or `!`, and a short method can be written on one line with `=`.
def double(n) = n * 2
assert_equal ___, double(4), 'a one-line method'
def describe(n)
  if n.zero? then 'zero' else 'something' end
end
assert_equal ___, describe(0), 'the last expression is the result'
def greet(name = 'world') = "Hello, #{name}"
assert_equal ___, greet, 'a default fills in a missing argument'
assert_equal ___, 4.even?, 'a ? method answers a question'
assert_raises(___) { double }
