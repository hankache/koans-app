# title: Integer arithmetic
# intro: Dividing two integers gives an integer, rounded down (toward minus infinity). `%` takes the sign of the divisor, and `**` raises to a power.
expect(7 / 2).to eq(___), 'integer division drops the fraction'
expect(-7 / 2).to eq(___), 'by rounding down'
expect(-7 % 3).to eq(___), "% takes the divisor's sign"
expect(7.divmod(2)).to eq(___), 'divmod gives both'
expect(2 ** 10).to eq(___), '** is a power'
expect(7.fdiv(2)).to eq(___), 'fdiv divides exactly'
