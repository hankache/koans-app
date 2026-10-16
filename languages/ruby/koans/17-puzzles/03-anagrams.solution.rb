words = %w[listen silent enlist google gooegl cat act]
groups = words.group_by { _1.chars.sort.join }
expect(groups['eilnst']).to eq(%w[listen silent enlist]), 'sorted letters are the key'
expect(groups.size).to eq(3), 'how many groups'
expect(groups.values.map(&:size)).to eq([3, 2, 2]), 'the size of each'
expect('dusty'.chars.sort == 'study'.chars.sort).to eq(true), 'a quick anagram test'
