module Loud
  def speak = super.upcase + '!'
end
class Dog
  prepend Loud
  def speak = 'woof'
end
expect(Dog.new.speak).to eq('WOOF!'), 'prepend wraps the class method'
expect(Dog.ancestors.first).to eq(Loud), 'it comes first'
module Shy
  def speak = '...'
end
quiet = Dog.new.extend(Shy)
expect(quiet.speak).to eq('...'), 'extend changes one object'
expect(Dog.new.speak).to eq('WOOF!'), 'and only that one'
