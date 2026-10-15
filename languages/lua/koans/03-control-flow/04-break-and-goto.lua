-- title: break and goto
-- intro: `break` leaves the innermost loop. Lua has no `continue`; `goto` a label at the end of the loop body does that job.
local found
for _, v in ipairs({4, 9, 12, 15}) do
  if v > 10 then
    found = v
    break
  end
end
assert.are.equal(___, found, 'break stops at the first match')
local odds = {}
for i = 1, 6 do
  if i % 2 == 0 then goto continue end
  odds[#odds + 1] = i
  ::continue::
end
assert.are.same(___, odds, 'goto continue skips to the next round')
