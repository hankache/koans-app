# title: Word frequencies
# intro: Counting how often each word appears is one call to `tally`. Sorting by count, then by word, breaks the ties.
freq = 'the cat and the hat and the bat'.split.tally
expect(freq['the']).to eq(___), 'how often "the" appears'
expect(freq.max_by { |_, n| n }).to eq(___), 'the most common'
expect(freq.sort_by { |w, n| [-n, w] }.first(2)).to eq(___), 'the top two, ties alphabetically'
expect(freq.fetch('dog', 0)).to eq(___), 'a word never seen'
expect(freq.values.sum).to eq(___), 'how many words in all'
