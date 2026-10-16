local function sorted_letters(word)
  local chars = {}
  for ch in word:gmatch('.') do chars[#chars + 1] = ch end
  table.sort(chars)
  return table.concat(chars)
end
assert.are.equal('eilnst', sorted_letters('listen'), 'sorted letters are the key')
assert.are.equal(true, sorted_letters('dusty') == sorted_letters('study'), 'anagrams share it')
local groups = {}
for _, w in ipairs({'listen', 'silent', 'enlist', 'cat', 'act'}) do
  local k = sorted_letters(w)
  groups[k] = groups[k] or {}
  table.insert(groups[k], w)
end
assert.are.same({'listen', 'silent', 'enlist'}, groups.eilnst, 'a group keeps the original order')
assert.are.equal(2, #groups.act, 'cat has one anagram')
