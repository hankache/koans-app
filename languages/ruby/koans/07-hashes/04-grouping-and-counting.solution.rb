words = %w[apple avocado banana blueberry cherry]
expect(words.group_by { |w| w[0] }).to eq({ 'a' => ['apple', 'avocado'], 'b' => ['banana', 'blueberry'], 'c' => ['cherry'] }), 'group_by'
expect(%w[a b a c a].tally).to eq({ 'a' => 3, 'b' => 1, 'c' => 1 }), 'tally counts'
lengths = words.each_with_object({}) { |w, h| h[w] = w.length }
expect(lengths['banana']).to eq(6), 'each_with_object builds as it goes'
expect(words.to_h { |w| [w, w.size] }.max_by(&:last).first).to eq('blueberry'), 'the longest word'
