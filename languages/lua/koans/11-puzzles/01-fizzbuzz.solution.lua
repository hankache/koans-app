local function fizzbuzz(n)
  local s = (n % 3 == 0 and 'Fizz' or '') .. (n % 5 == 0 and 'Buzz' or '')
  return s ~= '' and s or n
end
assert.are.equal('Fizz', fizzbuzz(9), 'a multiple of 3')
assert.are.equal('Buzz', fizzbuzz(10), 'a multiple of 5')
assert.are.equal('FizzBuzz', fizzbuzz(30), 'a multiple of both')
assert.are.equal(7, fizzbuzz(7), 'neither: the number itself')
local said = {}
for i = 1, 5 do said[i] = fizzbuzz(i) end
assert.are.same({1, 2, 'Fizz', 4, 'Buzz'}, said, 'the first five')
