# title: Merging and comparing
# intro: `merge` combines hashes, the second winning (or a block deciding). Hashes are equal when they have the same pairs, in any order.
defaults = { color: 'red', size: 'M' }
expect(defaults.merge(size: 'L')).to eq(___), 'the second wins'
a = { apples: 3 }
b = { apples: 2, pears: 1 }
expect(a.merge(b) { |_key, x, y| x + y }).to eq(___), 'or a block decides'
expect({ x: 1, y: 2 } == { y: 2, x: 1 }).to eq(___), 'order does not matter for =='
expect({ x: 1, y: 2 }.slice(:x)).to eq(___), 'slice keeps some keys'
expect({ x: 1, y: 2 }.except(:x)).to eq(___), 'except drops some'
expect({ a: 1 }.invert).to eq(___), 'invert swaps keys and values'
