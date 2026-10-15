def double(n) = n * 2
m = method(:double)
expect(m.call(4)).to eq(8), 'call a method object'
expect([1, 2, 3].map(&m)).to eq([2, 4, 6]), '& passes it as a block'
expect(%w[1 2].map(&method(:Integer))).to eq([1, 2]), 'any method will do'
expect(%w[a b].map(&:upcase)).to eq(['A', 'B']), 'a symbol works too, via to_proc'
expect(:upcase.to_proc.call('x')).to eq('X'), 'this is what &:upcase does'
