# title: Iterating and transforming
# intro: Hashes are Enumerable: iterate over key-value pairs, and transform the keys or values into a new hash.
prices = { tea: 3, cake: 5, jam: 4 }
total = 0
prices.each { |_item, price| total += price }
expect(total).to eq(___), 'each yields key and value'
expect(prices.transform_values { |p| p * 2 }).to eq(___), 'transform_values'
expect(prices.select { |_k, p| p > 3 }).to eq(___), 'select keeps a hash'
expect(prices.map { |k, p| "#{k}=#{p}" }).to eq(___), 'map makes an array'
expect(prices.to_h { |k, p| [p, k] }).to eq(___), 'to_h with a block builds a new hash'
expect(prices.min_by { |_k, p| p }).to eq(___), 'pairs come as two-item arrays'
expect(prices.sum { |_k, p| p }).to eq(___), 'sum with a block'
