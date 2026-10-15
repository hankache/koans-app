-- title: Functions
-- intro: Functions can return several values. Missing arguments are `nil`, and extra ones are ignored.
local function divmod(a, b)
  return a // b, a % b
end
local q, r = divmod(17, 5)
assert.are.equal(___, q, 'the first result')
assert.are.equal(___, r, 'and the second')
local function greet(name)
  return 'Hello, ' .. (name or 'world')
end
assert.are.equal(___, greet(), 'a missing argument is nil')
assert.are.equal(___, greet('Ada', 'extra'), 'an extra one is ignored')
