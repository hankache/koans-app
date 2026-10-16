freq = 'the cat and the hat and the bat'.split.tally
expect(freq['the']).to eq(3), 'how often "the" appears'
expect(freq.max_by { |_, n| n }).to eq(['the', 3]), 'the most common'
expect(freq.sort_by { |w, n| [-n, w] }.first(2)).to eq([['the', 3], ['and', 2]]), 'the top two, ties alphabetically'
expect(freq.fetch('dog', 0)).to eq(0), 'a word never seen'
expect(freq.values.sum).to eq(8), 'how many words in all'
