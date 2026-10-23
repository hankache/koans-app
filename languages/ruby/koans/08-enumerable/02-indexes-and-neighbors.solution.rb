labeled = %w[a b].each_with_index.map { |x, i| "#{i}:#{x}" }
expect(labeled).to eq(['0:a', '1:b']), 'each_with_index'
expect(%w[a b].map.with_index(1) { |x, i| "#{i}.#{x}" }).to eq(['1.a', '2.b']), 'with_index can start anywhere'
expect([1, 4, 9, 16].each_cons(2).map { |a, b| b - a }).to eq([3, 5, 7]), 'differences between neighbors'
expect([1, 2, 4, 5, 6, 9].chunk_while { |a, b| b == a + 1 }.to_a).to eq([[1, 2], [4, 5, 6], [9]]), 'runs of consecutive numbers'
expect([1, 1, 2, 3, 3].slice_when { |a, b| a != b }.map(&:size)).to eq([2, 1, 2]), 'slice_when cuts where items change'
