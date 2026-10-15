expect(7 / 2).to eq(3), 'integer division drops the fraction'
expect(-7 / 2).to eq(-4), 'by rounding down'
expect(-7 % 3).to eq(2), "% takes the divisor's sign"
expect(7.divmod(2)).to eq([3, 1]), 'divmod gives both'
expect(2 ** 10).to eq(1024), '** is a power'
expect(7.fdiv(2)).to eq(3.5), 'fdiv divides exactly'
