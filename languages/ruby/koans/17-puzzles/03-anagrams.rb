# title: Anagrams
# intro: Two words are anagrams when they use the same letters. Sorting a word's letters gives a key that all its anagrams share, and `group_by` gathers them.
words = %w[listen silent enlist google gooegl cat act]
groups = words.group_by { _1.chars.sort.join }
expect(groups['eilnst']).to eq(___), 'sorted letters are the key'
expect(groups.size).to eq(___), 'how many groups'
expect(groups.values.map(&:size)).to eq(___), 'the size of each'
expect('dusty'.chars.sort == 'study'.chars.sort).to eq(___), 'a quick anagram test'
