# title: Ranges
# intro: `1..5` includes its end and `1...5` doesn't. A range is an object of its own, which can be turned into an array, tested for membership, or summed.
expect((1..5).to_a).to eq(___), 'two dots include the end'
expect((1...5).to_a).to eq(___), 'three dots exclude it'
expect((1..10).include?(10)).to eq(___), 'membership'
expect((1..100).sum).to eq(___), 'sum without a loop'
expect(('a'..'e').to_a.join).to eq(___), 'letters make ranges too'
expect((1.0..2.0).include?(1.5)).to eq(___), 'and floats, for membership'
expect((1..10).step(3).to_a).to eq(___), 'step through a range'
