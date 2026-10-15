prices = { tea: 3, cake: 5, jam: 4 }
total = 0
prices.each { |_item, price| total += price }
expect(total).to eq(12), 'each yields key and value'
expect(prices.transform_values { |p| p * 2 }).to eq({ tea: 6, cake: 10, jam: 8 }), 'transform_values'
expect(prices.select { |_k, p| p > 3 }).to eq({ cake: 5, jam: 4 }), 'select keeps a hash'
expect(prices.map { |k, p| "#{k}=#{p}" }).to eq(['tea=3', 'cake=5', 'jam=4']), 'map makes an array'
expect(prices.to_h { |k, p| [p, k] }).to eq({ 3 => :tea, 5 => :cake, 4 => :jam }), 'to_h with a block builds a new hash'
expect(prices.min_by { |_k, p| p }).to eq([:tea, 3]), 'pairs come as two-item arrays'
expect(prices.sum { |_k, p| p }).to eq(12), 'sum with a block'
