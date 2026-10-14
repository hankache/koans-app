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
assert_equal 'Ada', ada.name, 'attr_reader reads @name'
ada.age = 37
assert_equal 37, ada.age, 'attr_accessor can also change @age'
assert_equal 'Ada (37)', "#{ada}", 'interpolation calls to_s'
assert_equal Person, ada.class, 'the object knows its class'
assert_raises(NoMethodError) { ada.name = 'Grace' }
