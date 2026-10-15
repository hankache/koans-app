local function Set(list)
  local set = {}
  for _, v in ipairs(list) do set[v] = true end
  return set
end
local vowels = Set({'a', 'e', 'i', 'o', 'u'})
assert.is_true(vowels['e'], 'membership is a lookup')
assert.is_nil(vowels['z'], 'and a missing key is nil')
local counts = {}
for word in ('the cat and the hat'):gmatch('%a+') do
  counts[word] = (counts[word] or 0) + 1
end
assert.are.equal(2, counts.the, 'counting words')
assert.are.same({the = 2, cat = 1, ['and'] = 1, hat = 1}, counts, 'and is a keyword, so it needs brackets')
