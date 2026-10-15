# title: reduce and sum
# intro: `reduce` (also called `inject`) combines all the items into one value, given a starting value or not.
expect([1, 2, 3, 4].reduce(:+)).to eq(___), 'reduce with an operator'
expect([1, 2, 3, 4].reduce(1) { |product, n| product * n }).to eq(___), 'with a start and a block'
expect(%w[a bb ccc].reduce(0) { |sum, w| sum + w.size }).to eq(___), 'any kind of total'
expect([].sum).to eq(___), 'sum of nothing'
expect([0.1, 0.2, 0.3].sum).to eq(___), 'sum adds floats carefully'
expect([[1, 2], [3, 4]].sum([])).to eq(___), 'sum can concatenate'
