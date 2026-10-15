local n = 1
while n < 100 do
  n = n * 3
end
assert.are.equal(243, n, 'while tests first')
local tries = 0
repeat
  tries = tries + 1
  local done = tries >= 3
until done
assert.are.equal(3, tries, 'until can use a local from the body')
local ran = 0
repeat
  ran = ran + 1
until true
assert.are.equal(1, ran, 'repeat always runs once')
