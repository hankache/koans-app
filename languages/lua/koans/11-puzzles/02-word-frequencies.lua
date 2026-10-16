-- title: Word frequencies
-- intro: Counting words with `gmatch` and a table, keeping a list of the words in the order they first appear, then sorting that list by count.
local freq, order = {}, {}
for w in ('the cat and the hat and the bat'):gmatch('%a+') do
  if not freq[w] then order[#order + 1] = w end
  freq[w] = (freq[w] or 0) + 1
end
assert.are.equal(___, freq.the, 'how often "the" appears')
assert.are.same(___, order, 'each word, at its first sight')
table.sort(order, function(a, b)
  if freq[a] ~= freq[b] then return freq[a] > freq[b] end
  return a < b
end)
assert.are.same(___, {order[1], order[2], order[3]}, 'most common first, ties alphabetically')
assert.are.equal(___, freq.dog, 'a word never seen')
