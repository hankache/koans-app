defaults = { color: 'red', size: 'M' }
expect(defaults.merge(size: 'L')).to eq({ color: 'red', size: 'L' }), 'the second wins'
a = { apples: 3 }
b = { apples: 2, pears: 1 }
expect(a.merge(b) { |_key, x, y| x + y }).to eq({ apples: 5, pears: 1 }), 'or a block decides'
expect({ x: 1, y: 2 } == { y: 2, x: 1 }).to eq(true), 'order does not matter for =='
expect({ x: 1, y: 2 }.slice(:x)).to eq({ x: 1 }), 'slice keeps some keys'
expect({ x: 1, y: 2 }.except(:x)).to eq({ y: 2 }), 'except drops some'
expect({ a: 1 }.invert).to eq({ 1 => :a }), 'invert swaps keys and values'
