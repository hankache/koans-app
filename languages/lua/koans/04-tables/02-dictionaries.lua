-- title: Tables as dictionaries
-- intro: A table maps any keys to values. `t.name` is short for `t['name']`, a missing key gives `nil`, and assigning `nil` removes a key.
local person = {name = 'Ada', age = 36}
assert.are.equal(___, person.name, 'a dot reads a key')
assert.are.equal(___, person['age'], 'so do brackets')
assert.are.equal(___, person.city, 'a missing key is nil')
person.city = 'London'
assert.are.equal(___, person.city, 'assigning adds a key')
person.city = nil
assert.are.same(___, person, 'assigning nil removes it')
