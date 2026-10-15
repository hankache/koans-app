counts = Hash.new(0)
'hello'.each_char { |c| counts[c] += 1 }
expect(counts['l']).to eq(2), 'a default of 0 makes counting easy'
expect(counts['z']).to eq(0), 'missing keys read as the default'
expect(counts.key?('z')).to eq(false), 'but are not added'
shared = Hash.new([])
shared[:a] << 1
expect(shared[:b]).to eq([1]), 'every key shares one default array'
fresh = Hash.new { |hash, key| hash[key] = [] }
fresh[:a] << 1
expect(fresh[:b]).to eq([]), 'a block makes a new one for each key'
