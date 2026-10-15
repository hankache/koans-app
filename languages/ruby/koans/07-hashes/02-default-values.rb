# title: Default values
# intro: A hash can give a default for missing keys, either one value or a block that computes it. A shared default object is a classic trap.
counts = Hash.new(0)
'hello'.each_char { |c| counts[c] += 1 }
expect(counts['l']).to eq(___), 'a default of 0 makes counting easy'
expect(counts['z']).to eq(___), 'missing keys read as the default'
expect(counts.key?('z')).to eq(___), 'but are not added'
shared = Hash.new([])
shared[:a] << 1
expect(shared[:b]).to eq(___), 'every key shares one default array'
fresh = Hash.new { |hash, key| hash[key] = [] }
fresh[:a] << 1
expect(fresh[:b]).to eq(___), 'a block makes a new one for each key'
