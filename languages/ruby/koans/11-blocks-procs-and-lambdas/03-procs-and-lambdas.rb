# title: Procs and lambdas
# intro: Both are blocks as objects. A lambda checks its argument count and `return` leaves the lambda; a proc is lenient, and its `return` leaves the method around it.
square = ->(x) { x * x }
expect(square.(5)).to eq(___), '.() calls it'
expect(square[6]).to eq(___), 'so does []'
expect(square.lambda?).to eq(___), 'a lambda'
expect { square.call(1, 2) }.to raise_error(___), 'lambdas check their arguments'
lenient = proc { |x, y| "#{x}-#{y.inspect}" }
expect(lenient.call(1)).to eq(___), 'procs do not'
def first_even(list)
  list.each { |n| return n if n.even? }
  nil
end
expect(first_even([1, 4, 6])).to eq(___), 'return in a block leaves the method'
