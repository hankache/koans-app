a = [2, 3]
a << 4
a.unshift(1)
expect(a).to eq([1, 2, 3, 4]), '<< and unshift'
expect(a.pop).to eq(4), 'pop takes from the end'
expect(a.shift).to eq(1), 'shift from the start'
a.insert(1, :x)
expect(a).to eq([2, :x, 3]), 'insert at an index'
a.delete(:x)
expect(a).to eq([2, 3]), 'delete a value'
expect([1, nil, 2, nil].compact).to eq([1, 2]), 'compact drops nils'
