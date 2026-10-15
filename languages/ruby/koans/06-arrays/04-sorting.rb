# title: Sorting
# intro: `sort` uses `<=>`, `sort_by` sorts by a computed key, and `min_by`, `max_by` and `minmax` find extremes.
words = %w[pear fig banana kiwi]
expect(words.sort).to eq(___), 'alphabetical'
expect(words.sort_by(&:length)).to eq(___), 'by length, ties in order'
expect(words.max_by(&:length)).to eq(___), 'the longest'
expect([5, 3, 9].minmax).to eq(___), 'both extremes'
expect([3, 1, 2].sort { |a, b| b <=> a }).to eq(___), 'a block chooses the order'
expect(1 <=> 2).to eq(___), '<=> gives -1, 0 or 1'
expect([[2, 'b'], [1, 'z'], [2, 'a']].sort).to eq(___), 'arrays sort item by item'
