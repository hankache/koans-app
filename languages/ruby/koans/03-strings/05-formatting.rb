# title: Formatting
# intro: `format` (also spelled `%`) builds strings from a template; `rjust`, `ljust` and `center` pad to a width.
expect(format('%05.1f', 3.14159)).to eq(___), 'width, zero padding, precision'
expect('%s has %d koans' % ['Ruby', 70]).to eq(___), '% with an array'
expect(format('%-6s|', 'ab')).to eq(___), 'a minus aligns left'
expect(format('%x', 255)).to eq(___), 'hexadecimal'
expect('7'.rjust(3, '0')).to eq(___), 'rjust pads on the left'
expect('mid'.center(7, '*')).to eq(___), 'center pads both sides'
expect(1234567.to_s.reverse.scan(/\d{1,3}/).join(',').reverse).to eq(___), 'thousands separators, by hand'
