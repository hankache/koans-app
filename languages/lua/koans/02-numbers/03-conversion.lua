-- title: Conversion
-- intro: `tonumber` reads a number from a string, or gives `nil`; `tostring` goes the other way. Arithmetic on a string of digits converts it, but `..` joins numbers as strings.
assert.are.equal(___, tonumber('42'), 'a string of digits')
assert.are.equal(___, tonumber('42px'), 'tonumber wants the whole string')
assert.are.equal(___, tonumber('ff', 16), 'in any base')
assert.are.equal(___, tostring(42), 'tostring')
assert.are.equal(___, '10' + 5, 'arithmetic converts strings to numbers')
assert.are.equal(___, '10' .. 5, 'and .. converts numbers to strings')
