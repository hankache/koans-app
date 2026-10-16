# title: Copies
# intro: `dup` and `clone` copy an object, but only one level deep: what it holds is shared. `clone` also keeps it frozen. `Marshal` can make a deep copy.
zen = 'zen'.freeze
expect(zen.dup.frozen?).to eq(___), 'dup makes an unfrozen copy'
expect(zen.clone.frozen?).to eq(___), 'clone keeps it frozen'
expect(zen.clone(freeze: false).frozen?).to eq(___), 'unless asked not to'
list = [[1], [2]]
copy = list.dup
copy[0] << 99
expect(list[0]).to eq(___), 'a copy shares what it holds'
expect(copy.equal?(list)).to eq(___), 'but is an object of its own'
deep = Marshal.load(Marshal.dump(list))
deep[1] << 7
expect(list[1]).to eq(___), 'Marshal makes a deep copy'
