letters = %w[a b c d e]
expect(letters[1..3]).to eq(%w[b c d]), 'a range slices an array'
expect(letters[2..]).to eq(%w[c d e]), 'an endless range goes to the end'
expect('koans.app'[..4]).to eq('koans'), 'a beginless range starts at the beginning'
expect(15.clamp(1..10)).to eq(10), 'clamp keeps a number inside a range'
expect((1..).lazy.map { _1 * 2 }.first(3)).to eq([2, 4, 6]), 'an endless range, used lazily'
expect(('a'..'z').cover?('mm')).to eq(true), 'cover? compares with the ends'
expect(('a'..'z').include?('mm')).to eq(false), 'include? looks for a member'
