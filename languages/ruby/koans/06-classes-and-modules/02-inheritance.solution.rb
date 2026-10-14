class Animal
  def initialize(name)
    @name = name
  end

  def speak = "#{@name} makes a sound"
end

class Dog < Animal
  def speak = super.sub('makes a sound', 'barks')
end
assert_equal 'Rex barks', Dog.new('Rex').speak, 'super calls the parent method'
assert_equal 'Tom makes a sound', Animal.new('Tom').speak, 'which still works on its own'
assert_equal Animal, Dog.superclass, 'the parent class'
assert_equal true, Dog.new('Rex').is_a?(Animal), 'a dog is an animal'
assert_equal true, Dog.ancestors.include?(Object), 'and every class comes from Object'
