-- title: Error levels
-- intro: A string error gets the position where it was raised. Level 2 blames the caller instead, and level 0 adds no position at all.
local function inner() error('here') end
local _, e1 = pcall(inner)
assert.matches(___, e1, 'level 1, the default, adds the file and line')
local function needs_number(n)
  if type(n) ~= 'number' then error('a number, please', 2) end
end
local caller_line = debug.getinfo(1, 'l').currentline + 1
local function caller() needs_number('x') end
local _, e2 = pcall(caller)
assert.are.equal(caller_line, tonumber(e2:match(':(%d+):')), "level 2 reports the caller's line")
assert.matches(___, e2, 'with the message after it')
local _, e0 = pcall(error, 'plain', 0)
assert.are.equal(___, e0, 'level 0 adds nothing')
