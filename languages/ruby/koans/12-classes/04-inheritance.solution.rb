class Vehicle
  def initialize(wheels) = @wheels = wheels
  def describe = "#{@wheels} wheels"
end
class Bicycle < Vehicle
  def initialize = super(2)
  def describe = "a bicycle with #{super}"
end
bike = Bicycle.new
expect(bike.describe).to eq('a bicycle with 2 wheels'), 'super calls the parent'
expect(bike).to be_a(Vehicle), 'a bicycle is a vehicle'
expect(bike).not_to be_an_instance_of(Vehicle), 'but not exactly one'
expect(Bicycle.superclass).to eq(Vehicle), 'its parent'
expect(Bicycle.ancestors.take(3)).to eq([Bicycle, Vehicle, Object]), 'and the chain above it'
