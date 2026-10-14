local function counter()
  local count = 0
  return function()
    count = count + 1
    return count
  end
end
local nextNumber = counter()
nextNumber()
assert.are.equal(2, nextNumber(), 'the function keeps its count')
assert.are.equal(1, counter()(), 'each counter has its own')
local function adder(n)
  return function(x) return x + n end
end
assert.are.equal(13, adder(3)(10), 'an adder remembers its n')
