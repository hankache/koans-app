words = %w[pear fig banana kiwi]
expect(words.sort).to eq(['banana', 'fig', 'kiwi', 'pear']), 'alphabetical'
expect(words.sort_by(&:length)).to eq(['fig', 'pear', 'kiwi', 'banana']), 'by length, ties in order'
expect(words.max_by(&:length)).to eq('banana'), 'the longest'
expect([5, 3, 9].minmax).to eq([3, 9]), 'both extremes'
expect([3, 1, 2].sort { |a, b| b <=> a }).to eq([3, 2, 1]), 'a block chooses the order'
expect(1 <=> 2).to eq(-1), '<=> gives -1, 0 or 1'
expect([[2, 'b'], [1, 'z'], [2, 'a']].sort).to eq([[1, 'z'], [2, 'a'], [2, 'b']]), 'arrays sort item by item'
