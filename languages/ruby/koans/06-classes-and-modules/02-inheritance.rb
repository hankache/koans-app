# title: Inheritance
# intro: `class Dog < Animal` makes Dog a subclass. A method can replace its parent's and still call it with `super`.
class Animal
  def initialize(name)
    @name = name
  end

  def speak = "#{@name} makes a sound"
end

class Dog < Animal
  def speak = super.sub('makes a sound', 'barks')
end
assert_equal ___, Dog.new('Rex').speak, 'super calls the parent method'
assert_equal ___, Animal.new('Tom').speak, 'which still works on its own'
assert_equal ___, Dog.superclass, 'the parent class'
assert_equal ___, Dog.new('Rex').is_a?(Animal), 'a dog is an animal'
assert_equal ___, Dog.ancestors.include?(Object), 'and every class comes from Object'
