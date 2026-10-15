squares = (1..).lazy.map { |n| n * n }
expect(squares.first(4)).to eq([1, 4, 9, 16]), 'an endless list of squares'
expect((1..).lazy.select(&:even?).map { |n| n * 3 }.first(3)).to eq([6, 12, 18]), 'chained, still lazy'
seen = []
(1..10).lazy.map { |n| seen << n; n }.first(2)
expect(seen).to eq([1, 2]), 'only the items needed were processed'
