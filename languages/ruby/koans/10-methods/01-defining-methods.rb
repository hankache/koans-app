# title: Defining methods
# intro: A method returns the value of its last expression; `return` leaves early. Parentheses around arguments are optional, and a one-line method can be written with `=`.
def greet(name)
  "Hello, #{name}"
end
expect(greet('Ada')).to eq(___), 'the last expression is returned'
expect(greet 'Alan').to eq(___), 'parentheses are optional'
def sign(n)
  return 'zero' if n.zero?
  n.positive? ? 'positive' : 'negative'
end
expect(sign(0)).to eq(___), 'return leaves early'
def square(n) = n * n
expect(square(9)).to eq(___), 'an endless method'
def min_max(list) = [list.min, list.max]
low, high = min_max([3, 9, 1])
expect(high).to eq(___), 'return several values as an array'
