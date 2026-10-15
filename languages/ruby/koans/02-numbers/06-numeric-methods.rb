# title: Numeric methods
# intro: Numbers come with methods for iterating, clamping and comparing, which often replace a loop or an `if`.
squares = []
1.upto(3) { |n| squares << n * n }
expect(squares).to eq(___), 'upto counts up'
expect(15.clamp(1, 10)).to eq(___), 'clamp keeps a number in range'
expect(12.gcd(18)).to eq(___), 'greatest common divisor'
expect(4.lcm(6)).to eq(___), 'least common multiple'
expect(1.step(10, 4).to_a).to eq(___), 'step counts in strides'
expect(3.between?(1, 5)).to eq(___), 'between?'
expect(5).to be_between(1, ___), 'be_between includes both ends'
