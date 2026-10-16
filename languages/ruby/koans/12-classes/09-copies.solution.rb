zen = 'zen'.freeze
expect(zen.dup.frozen?).to eq(false), 'dup makes an unfrozen copy'
expect(zen.clone.frozen?).to eq(true), 'clone keeps it frozen'
expect(zen.clone(freeze: false).frozen?).to eq(false), 'unless asked not to'
list = [[1], [2]]
copy = list.dup
copy[0] << 99
expect(list[0]).to eq([1, 99]), 'a copy shares what it holds'
expect(copy.equal?(list)).to eq(false), 'but is an object of its own'
deep = Marshal.load(Marshal.dump(list))
deep[1] << 7
expect(list[1]).to eq([2]), 'Marshal makes a deep copy'
