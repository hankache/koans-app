-- title: Locals and globals
-- intro: A variable is global unless declared `local`. Globals live in the table `_G`; locals belong to the block they're declared in, and are what Lua code normally uses.
answer = 42
assert.are.equal(___, _G.answer, 'a global is a key in _G')
local hidden = 'local'
assert.are.equal(___, _G.hidden, 'a local is not')
do
  local inner = 'inside'
  assert.are.equal(___, inner, 'do ... end makes a block')
end
assert.are.equal(___, inner, 'and its locals end with it')
local x = 1
do
  local x = 2
end
assert.are.equal(___, x, 'an inner local can shadow an outer one')
