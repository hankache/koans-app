# title: Classes
# intro: A class makes objects. `initialize` sets them up, instance variables start with `@`, and `attr_reader` and `attr_accessor` write the methods that read and change them.
class Person
  attr_reader :name
  attr_accessor :age

  def initialize(name, age)
    @name = name
    @age = age
  end

  def to_s = "#{name} (#{age})"
end
ada = Person.new('Ada', 36)
assert_equal ___, ada.name, 'attr_reader reads @name'
ada.age = 37
assert_equal ___, ada.age, 'attr_accessor can also change @age'
assert_equal ___, "#{ada}", 'interpolation calls to_s'
assert_equal ___, ada.class, 'the object knows its class'
assert_raises(___) { ada.name = 'Grace' }
