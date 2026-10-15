# title: Method objects
# intro: `method(:name)` turns a method into an object you can pass around, and `&` turns it, or a symbol, into a block.
def double(n) = n * 2
m = method(:double)
expect(m.call(4)).to eq(___), 'call a method object'
expect([1, 2, 3].map(&m)).to eq(___), '& passes it as a block'
expect(%w[1 2].map(&method(:Integer))).to eq(___), 'any method will do'
expect(%w[a b].map(&:upcase)).to eq(___), 'a symbol works too, via to_proc'
expect(:upcase.to_proc.call('x')).to eq(___), 'this is what &:upcase does'
