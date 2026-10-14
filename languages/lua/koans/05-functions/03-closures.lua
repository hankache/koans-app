-- title: Closures
-- intro: A function keeps the local variables around it, even after the code that made them has returned. Each call of the outer function makes fresh ones.
local function counter()
  local count = 0
  return function()
    count = count + 1
    return count
  end
end
local nextNumber = counter()
nextNumber()
assert.are.equal(___, nextNumber(), 'the function keeps its count')
assert.are.equal(___, counter()(), 'each counter has its own')
local function adder(n)
  return function(x) return x + n end
end
assert.are.equal(___, adder(3)(10), 'an adder remembers its n')
