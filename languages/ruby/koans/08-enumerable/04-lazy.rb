# title: Lazy
# intro: `lazy` makes a chain process items one at a time, only as many as needed, so it can work on endless sequences.
squares = (1..).lazy.map { |n| n * n }
expect(squares.first(4)).to eq(___), 'an endless list of squares'
expect((1..).lazy.select(&:even?).map { |n| n * 3 }.first(3)).to eq(___), 'chained, still lazy'
seen = []
(1..10).lazy.map { |n| seen << n; n }.first(2)
expect(seen).to eq(___), 'only the items needed were processed'
