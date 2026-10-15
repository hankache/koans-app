first, second = [1, 2]
expect(second).to eq(2), 'assign several at once'
a, b = 1, 2
a, b = b, a
expect([a, b]).to eq([2, 1]), 'swap without a temporary'
head, *tail = [1, 2, 3, 4]
expect(tail).to eq([2, 3, 4]), '* gathers the rest'
*init, last = [1, 2, 3, 4]
expect(init).to eq([1, 2, 3]), 'from either side'
(x, y), z = [1, 2], 3
expect(y).to eq(2), 'parentheses unpack nested arrays'
expect([*1..3, *[4, 5]]).to eq([1, 2, 3, 4, 5]), '* spreads into an array'
