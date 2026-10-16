encode = ->(s) { s.chars.chunk_while { _1 == _2 }.map { "#{_1.size}#{_1[0]}" }.join }
decode = ->(s) { s.scan(/(\d+)(\D)/).map { |n, ch| ch * n.to_i }.join }
expect(encode.('aaabcc')).to eq('3a1b2c'), 'each run becomes a count and a letter'
expect('aabbbac'.chars.chunk_while { _1 == _2 }.map(&:first)).to eq(%w[a b a c]), 'chunk_while groups runs, not equal letters'
expect(decode.('2x3y')).to eq('xxyyy'), 'decoding repeats each letter'
expect(decode.(encode.('hello'))).to eq('hello'), 'the round trip'
