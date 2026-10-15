module Greeter
  def greet = "Hi, I'm #{name}"
end
class Robot
  include Greeter
  def name = 'R2'
end
expect(Robot.new.greet).to eq("Hi, I'm R2"), 'a mixed-in method'
expect(Robot.ancestors.take(2)).to eq([Robot, Greeter]), 'the module sits above the class'
expect(Robot.include?(Greeter)).to eq(true), 'include?'
expect(Robot.new).to be_a(Greeter), 'its objects count as Greeters'
