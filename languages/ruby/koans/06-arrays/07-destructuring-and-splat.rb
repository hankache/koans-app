# title: Destructuring and splat
# intro: Several variables can be assigned at once from an array. `*` gathers the rest, and in a call, spreads an array into arguments.
first, second = [1, 2]
expect(second).to eq(___), 'assign several at once'
a, b = 1, 2
a, b = b, a
expect([a, b]).to eq(___), 'swap without a temporary'
head, *tail = [1, 2, 3, 4]
expect(tail).to eq(___), '* gathers the rest'
*init, last = [1, 2, 3, 4]
expect(init).to eq(___), 'from either side'
(x, y), z = [1, 2], 3
expect(y).to eq(___), 'parentheses unpack nested arrays'
expect([*1..3, *[4, 5]]).to eq(___), '* spreads into an array'
