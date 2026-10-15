def greet(name)
  "Hello, #{name}"
end
expect(greet('Ada')).to eq('Hello, Ada'), 'the last expression is returned'
expect(greet 'Alan').to eq('Hello, Alan'), 'parentheses are optional'
def sign(n)
  return 'zero' if n.zero?
  n.positive? ? 'positive' : 'negative'
end
expect(sign(0)).to eq('zero'), 'return leaves early'
def square(n) = n * n
expect(square(9)).to eq(81), 'an endless method'
def min_max(list) = [list.min, list.max]
low, high = min_max([3, 9, 1])
expect(high).to eq(9), 'return several values as an array'
