a = [10, 'two', :three, nil]
expect(a.size).to eq(4), 'any kind of object'
expect(a[1]).to eq('two'), 'indexed from 0'
expect(a[-2]).to eq(:three), 'negative from the end'
expect([1, 2, 3, 4].first(2)).to eq([1, 2]), 'first(n)'
expect([1, 2, 3, 4].last).to eq(4), 'last'
expect(Array.new(3, 0)).to eq([0, 0, 0]), 'Array.new fills'
expect(Array.new(3) { |i| i * i }).to eq([0, 1, 4]), 'or computes each item'
expect(%w[red green blue]).to eq(['red', 'green', 'blue']), '%w makes an array of words'
