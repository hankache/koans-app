-- title: Roman numerals
-- intro: Converting to Roman numerals: take the largest symbol that fits, again and again. Listing `CM`, `XC` and the other pairs as symbols of their own handles the subtractions.
local SYMBOLS = {{1000, 'M'}, {900, 'CM'}, {500, 'D'}, {400, 'CD'}, {100, 'C'}, {90, 'XC'}, {50, 'L'}, {40, 'XL'}, {10, 'X'}, {9, 'IX'}, {5, 'V'}, {4, 'IV'}, {1, 'I'}}
local function roman(n)
  local out = {}
  for _, pair in ipairs(SYMBOLS) do
    while n >= pair[1] do
      out[#out + 1] = pair[2]
      n = n - pair[1]
    end
  end
  return table.concat(out)
end
assert.are.equal(___, roman(3), 'the same symbol repeats')
assert.are.equal(___, roman(4), 'one before five')
assert.are.equal(___, roman(14), 'ten, then four')
assert.are.equal(___, roman(1994), 'a year')
assert.are.equal(___, roman(0), 'the Romans had no zero')
