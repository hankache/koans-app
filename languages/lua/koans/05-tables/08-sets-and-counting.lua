-- title: Sets and counting
-- intro: A table with values as keys makes a set, and one with counts as values a counter: the key does the looking up.
local function Set(list)
  local set = {}
  for _, v in ipairs(list) do set[v] = true end
  return set
end
local vowels = Set({'a', 'e', 'i', 'o', 'u'})
assert.is_true(___, 'membership is a lookup')
assert.is_nil(___, 'and a missing key is nil')
local counts = {}
for word in ('the cat and the hat'):gmatch('%a+') do
  counts[word] = (counts[word] or 0) + 1
end
assert.are.equal(___, counts.the, 'counting words')
assert.are.same(___, counts, 'and is a keyword, so it needs brackets')
