# title: Rationals
# intro: A `Rational` is an exact fraction. Write one with an `r` suffix; arithmetic on rationals never loses precision.
expect(1/3r + 1/6r).to eq(___), 'exact fractions'
expect(Rational(6, 8)).to eq(___), 'kept in lowest terms'
expect((1/3r).to_f).to be_within(0.001).of(___), 'converted to a float'
expect(0.75.to_r).to eq(___), 'and back from one'
expect((3/4r).numerator).to eq(___), 'the top'
expect(1/3r * 3).to eq(___), 'a third, three times, is exactly one'
