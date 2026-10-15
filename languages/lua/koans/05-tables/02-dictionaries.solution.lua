local person = {name = 'Ada', age = 36}
assert.are.equal('Ada', person.name, 'a dot reads a key')
assert.are.equal(36, person['age'], 'so do brackets')
assert.are.equal(nil, person.city, 'a missing key is nil')
person.city = 'London'
assert.are.equal('London', person.city, 'assigning adds a key')
person.city = nil
assert.are.same({name = 'Ada', age = 36}, person, 'assigning nil removes it')
