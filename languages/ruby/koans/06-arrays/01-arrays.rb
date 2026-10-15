# title: Arrays
# intro: An array holds any objects in order. Index from 0, or from the end with negative numbers; `first` and `last` take several.
a = [10, 'two', :three, nil]
expect(a.size).to eq(___), 'any kind of object'
expect(a[1]).to eq(___), 'indexed from 0'
expect(a[-2]).to eq(___), 'negative from the end'
expect([1, 2, 3, 4].first(2)).to eq(___), 'first(n)'
expect([1, 2, 3, 4].last).to eq(___), 'last'
expect(Array.new(3, 0)).to eq(___), 'Array.new fills'
expect(Array.new(3) { |i| i * i }).to eq(___), 'or computes each item'
expect(%w[red green blue]).to eq(___), '%w makes an array of words'
