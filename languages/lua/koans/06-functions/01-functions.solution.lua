local function divmod(a, b)
  return a // b, a % b
end
local q, r = divmod(17, 5)
assert.are.equal(3, q, 'the first result')
assert.are.equal(2, r, 'and the second')
local function greet(name)
  return 'Hello, ' .. (name or 'world')
end
assert.are.equal('Hello, world', greet(), 'a missing argument is nil')
assert.are.equal('Hello, Ada', greet('Ada', 'extra'), 'an extra one is ignored')
