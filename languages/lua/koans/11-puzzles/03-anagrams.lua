-- title: Anagrams
-- intro: Two words are anagrams when they use the same letters. Sorting a word's letters gives a key that all its anagrams share.
local function sorted_letters(word)
  local chars = {}
  for ch in word:gmatch('.') do chars[#chars + 1] = ch end
  table.sort(chars)
  return table.concat(chars)
end
assert.are.equal(___, sorted_letters('listen'), 'sorted letters are the key')
assert.are.equal(___, sorted_letters('dusty') == sorted_letters('study'), 'anagrams share it')
local groups = {}
for _, w in ipairs({'listen', 'silent', 'enlist', 'cat', 'act'}) do
  local k = sorted_letters(w)
  groups[k] = groups[k] or {}
  table.insert(groups[k], w)
end
assert.are.same(___, groups.eilnst, 'a group keeps the original order')
assert.are.equal(___, #groups.act, 'cat has one anagram')
