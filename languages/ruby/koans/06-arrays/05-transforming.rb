# title: Transforming
# intro: `map` transforms each item, `flat_map` flattens the results one level, `zip` pairs arrays up, and `each_slice` cuts one into groups.
expect([1, 2, 3].map { |n| n * 10 }).to eq(___), 'map'
expect(%w[a b].map(&:upcase)).to eq(___), '&:name is a short block'
expect([1, 2].flat_map { |n| [n, -n] }).to eq(___), 'flat_map'
expect([1, 2, 3].zip(%w[a b c])).to eq(___), 'zip pairs them'
expect((1..7).each_slice(3).to_a).to eq(___), 'each_slice'
expect([[1, 2], [3, 4]].transpose).to eq(___), 'transpose swaps rows and columns'
expect([1, 2, 3].filter_map { |n| n * 2 if n.odd? }).to eq(___), 'filter_map keeps the truthy results'
