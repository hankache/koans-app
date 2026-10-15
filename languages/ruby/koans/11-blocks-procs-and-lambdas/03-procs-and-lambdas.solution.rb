square = ->(x) { x * x }
expect(square.(5)).to eq(25), '.() calls it'
expect(square[6]).to eq(36), 'so does []'
expect(square.lambda?).to eq(true), 'a lambda'
expect { square.call(1, 2) }.to raise_error(ArgumentError), 'lambdas check their arguments'
lenient = proc { |x, y| "#{x}-#{y.inspect}" }
expect(lenient.call(1)).to eq('1-nil'), 'procs do not'
def first_even(list)
  list.each { |n| return n if n.even? }
  nil
end
expect(first_even([1, 4, 6])).to eq(4), 'return in a block leaves the method'
