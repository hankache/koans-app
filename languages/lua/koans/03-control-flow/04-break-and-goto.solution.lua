local found
for _, v in ipairs({4, 9, 12, 15}) do
  if v > 10 then
    found = v
    break
  end
end
assert.are.equal(12, found, 'break stops at the first match')
local odds = {}
for i = 1, 6 do
  if i % 2 == 0 then goto continue end
  odds[#odds + 1] = i
  ::continue::
end
assert.are.same({1, 3, 5}, odds, 'goto continue skips to the next round')
