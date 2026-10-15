expect([].empty?).to eq(true), '? methods answer yes or no'
expect([]).to be_empty, 'RSpec turns be_empty into empty?'
expect(4).to be_even, 'and be_even into even?'
list = [3, 1, 2]
sorted = list.sort
expect(list).to eq([3, 1, 2]), 'sort leaves the array alone'
list.sort!
expect(list).to eq([1, 2, 3]), 'sort! changes it'
expect(sorted.frozen?).to eq(false), 'conventions, not rules: nothing is frozen'
