# title: Format specs
# intro: After a `:` in an f-string comes a format spec: width, alignment, padding, decimal places, separators, percentages and bases.
assert f'{3.14159:.2f}' == ___, 'two decimals'
assert f'{42:>5}' == ___, 'right-aligned in five places'
assert f'{42:05}' == ___, 'padded with zeros'
assert f'{1234567:,}' == ___, 'with thousands separators'
assert f'{0.25:.0%}' == ___, 'as a percentage'
assert f'{255:#x}' == ___, 'in hexadecimal'
assert f'{"hi":*^6}' == ___, 'centred, padded with a character'
