# title: Inheritance
# intro: A subclass inherits its parent's methods and can override them. `super` calls the parent's version, with the same arguments unless given others.
class Vehicle
  def initialize(wheels) = @wheels = wheels
  def describe = "#{@wheels} wheels"
end
class Bicycle < Vehicle
  def initialize = super(2)
  def describe = "a bicycle with #{super}"
end
bike = Bicycle.new
expect(bike.describe).to eq(___), 'super calls the parent'
expect(bike).to be_a(___), 'a bicycle is a vehicle'
expect(bike).not_to be_an_instance_of(___), 'but not exactly one'
expect(Bicycle.superclass).to eq(___), 'its parent'
expect(Bicycle.ancestors.take(3)).to eq(___), 'and the chain above it'
