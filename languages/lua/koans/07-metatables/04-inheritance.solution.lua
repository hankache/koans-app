local Animal = {}
Animal.__index = Animal
function Animal.new(name) return setmetatable({name = name}, Animal) end
function Animal:speak() return self.name .. ' makes a sound' end
local Dog = setmetatable({}, {__index = Animal})
Dog.__index = Dog
function Dog.new(name) return setmetatable(Animal.new(name), Dog) end
function Dog:speak() return self.name .. ' barks' end
function Dog:fetch() return self.name .. ' fetches' end
local rex = Dog.new('Rex')
assert.are.equal('Rex barks', rex:speak(), 'Dog replaces speak')
assert.are.equal('Rex fetches', rex:fetch(), 'and adds fetch')
assert.are.equal('Tom makes a sound', Animal.new('Tom'):speak(), 'Animal is unchanged')
assert.are.equal('Rex makes a sound', Animal.speak(rex), 'and a parent method can still be called')
