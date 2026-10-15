# title: Indexes and neighbours
# intro: `each_with_index` and `with_index` give positions; `each_cons` walks overlapping neighbours and `chunk_while` groups runs.
labelled = %w[a b].each_with_index.map { |x, i| "#{i}:#{x}" }
expect(labelled).to eq(___), 'each_with_index'
expect(%w[a b].map.with_index(1) { |x, i| "#{i}.#{x}" }).to eq(___), 'with_index can start anywhere'
expect([1, 4, 9, 16].each_cons(2).map { |a, b| b - a }).to eq(___), 'differences between neighbours'
expect([1, 2, 4, 5, 6, 9].chunk_while { |a, b| b == a + 1 }.to_a).to eq(___), 'runs of consecutive numbers'
expect([1, 1, 2, 3, 3].slice_when { |a, b| a != b }.map(&:size)).to eq(___), 'slice_when cuts where items change'
