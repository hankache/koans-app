squares = []
1.upto(3) { |n| squares << n * n }
expect(squares).to eq([1, 4, 9]), 'upto counts up'
expect(15.clamp(1, 10)).to eq(10), 'clamp keeps a number in range'
expect(12.gcd(18)).to eq(6), 'greatest common divisor'
expect(4.lcm(6)).to eq(12), 'least common multiple'
expect(1.step(10, 4).to_a).to eq([1, 5, 9]), 'step counts in strides'
expect(3.between?(1, 5)).to eq(true), 'between?'
expect(5).to be_between(1, 5), 'be_between includes both ends'
