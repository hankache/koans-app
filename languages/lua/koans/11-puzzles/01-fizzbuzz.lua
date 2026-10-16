-- title: FizzBuzz
-- intro: The classic: count from 1, but say "Fizz" for multiples of 3, "Buzz" for multiples of 5, and "FizzBuzz" for both. Read this version and predict what it says.
local function fizzbuzz(n)
  local s = (n % 3 == 0 and 'Fizz' or '') .. (n % 5 == 0 and 'Buzz' or '')
  return s ~= '' and s or n
end
assert.are.equal(___, fizzbuzz(9), 'a multiple of 3')
assert.are.equal(___, fizzbuzz(10), 'a multiple of 5')
assert.are.equal(___, fizzbuzz(30), 'a multiple of both')
assert.are.equal(___, fizzbuzz(7), 'neither: the number itself')
local said = {}
for i = 1, 5 do said[i] = fizzbuzz(i) end
assert.are.same(___, said, 'the first five')
