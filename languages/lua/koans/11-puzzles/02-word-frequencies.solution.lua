local freq, order = {}, {}
for w in ('the cat and the hat and the bat'):gmatch('%a+') do
  if not freq[w] then order[#order + 1] = w end
  freq[w] = (freq[w] or 0) + 1
end
assert.are.equal(3, freq.the, 'how often "the" appears')
assert.are.same({'the', 'cat', 'and', 'hat', 'bat'}, order, 'each word, at its first sight')
table.sort(order, function(a, b)
  if freq[a] ~= freq[b] then return freq[a] > freq[b] end
  return a < b
end)
assert.are.same({'the', 'and', 'bat'}, {order[1], order[2], order[3]}, 'most common first, ties alphabetically')
assert.are.equal(nil, freq.dog, 'a word never seen')
