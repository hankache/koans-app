# title: prepend and extend
# intro: `prepend` puts a module before the class, so its methods run first and can call `super`. `extend` adds a module's methods to one object.
module Loud
  def speak = super.upcase + '!'
end
class Dog
  prepend Loud
  def speak = 'woof'
end
expect(Dog.new.speak).to eq(___), 'prepend wraps the class method'
expect(Dog.ancestors.first).to eq(___), 'it comes first'
module Shy
  def speak = '...'
end
quiet = Dog.new.extend(Shy)
expect(quiet.speak).to eq(___), 'extend changes one object'
expect(Dog.new.speak).to eq(___), 'and only that one'
