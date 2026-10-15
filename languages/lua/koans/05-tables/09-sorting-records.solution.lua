local people = {
  {name = 'Grace', age = 85},
  {name = 'Ada', age = 36},
  {name = 'Alan', age = 41},
}
table.sort(people, function(a, b) return a.age < b.age end)
assert.are.equal('Ada', people[1].name, 'youngest first')
table.sort(people, function(a, b) return a.name > b.name end)
assert.are.equal('Grace', people[1].name, 'names in reverse')
local words = {'pear', 'fig', 'kiwi', 'apple'}
table.sort(words, function(a, b)
  if #a ~= #b then return #a < #b end
  return a < b
end)
assert.are.same({'fig', 'kiwi', 'pear', 'apple'}, words, 'by length, then alphabetically')
