# title: Ranges in practice
# intro: Ranges slice arrays and strings, keep numbers in bounds with `clamp`, and can go on forever when used lazily. `cover?` compares with the ends; `include?` looks for a member.
letters = %w[a b c d e]
expect(letters[1..3]).to eq(___), 'a range slices an array'
expect(letters[2..]).to eq(___), 'an endless range goes to the end'
expect('koans.app'[..4]).to eq(___), 'a beginless range starts at the beginning'
expect(15.clamp(1..10)).to eq(___), 'clamp keeps a number inside a range'
expect((1..).lazy.map { _1 * 2 }.first(3)).to eq(___), 'an endless range, used lazily'
expect(('a'..'z').cover?('mm')).to eq(___), 'cover? compares with the ends'
expect(('a'..'z').include?('mm')).to eq(___), 'include? looks for a member'
