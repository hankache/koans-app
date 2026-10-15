# title: Floats
# intro: Floats are binary approximations, so compare them with `be_within(…).of(…)`. Rounding methods choose a direction, and dividing a float by zero gives `Infinity`.
expect(0.1 + 0.2).not_to eq(___), 'floats are approximate'
expect(0.1 + 0.2).to be_within(0.0001).of(___), 'so compare them within a margin'
expect(3.7.floor).to eq(___), 'floor rounds down'
expect(3.2.ceil).to eq(___), 'ceil rounds up'
expect(2.5.round).to eq(___), 'round takes halves away from zero'
expect(3.14159.round(2)).to eq(___), 'round to some places'
expect(1.0 / 0).to eq(___), 'a float divided by zero'
expect((0.0 / 0).nan?).to eq(___), 'and 0.0 / 0 is not a number'
