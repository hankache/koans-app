# title: Grouping and counting
# intro: `group_by`, `tally` and `each_with_object` turn a list into a hash in one step.
words = %w[apple avocado banana blueberry cherry]
expect(words.group_by { |w| w[0] }).to eq(___), 'group_by'
expect(%w[a b a c a].tally).to eq(___), 'tally counts'
lengths = words.each_with_object({}) { |w, h| h[w] = w.length }
expect(lengths['banana']).to eq(___), 'each_with_object builds as it goes'
expect(words.to_h { |w| [w, w.size] }.max_by(&:last).first).to eq(___), 'the longest word'
