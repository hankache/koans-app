# title: Naming conventions
# intro: A method ending in `?` answers a question; one ending in `!` is the dangerous version, usually changing its receiver; one ending in `=` is a setter.
expect([].empty?).to eq(___), '? methods answer yes or no'
expect([]).to be_empty, 'RSpec turns be_empty into empty?'
expect(4).to be_even, 'and be_even into even?'
list = [3, 1, 2]
sorted = list.sort
expect(list).to eq(___), 'sort leaves the array alone'
list.sort!
expect(list).to eq(___), 'sort! changes it'
expect(sorted.frozen?).to eq(___), 'conventions, not rules: nothing is frozen'
