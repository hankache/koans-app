-- title: while and repeat
-- intro: `while` tests before each round; `repeat … until` tests after, so it runs at least once, and its condition can see the loop body's locals.
local n = 1
while n < 100 do
  n = n * 3
end
assert.are.equal(___, n, 'while tests first')
local tries = 0
repeat
  tries = tries + 1
  local done = tries >= 3
until done
assert.are.equal(___, tries, 'until can use a local from the body')
local ran = 0
repeat
  ran = ran + 1
until true
assert.are.equal(___, ran, 'repeat always runs once')
