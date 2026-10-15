answer = 42
assert.are.equal(42, _G.answer, 'a global is a key in _G')
local hidden = 'local'
assert.are.equal(nil, _G.hidden, 'a local is not')
do
  local inner = 'inside'
  assert.are.equal('inside', inner, 'do ... end makes a block')
end
assert.are.equal(nil, inner, 'and its locals end with it')
local x = 1
do
  local x = 2
end
assert.are.equal(1, x, 'an inner local can shadow an outer one')
