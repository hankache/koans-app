# title: Mixins
# intro: A module groups methods that classes can `include`. The module joins the class's ancestors, so its methods are found after the class's own.
module Greeter
  def greet = "Hi, I'm #{name}"
end
class Robot
  include Greeter
  def name = 'R2'
end
expect(Robot.new.greet).to eq(___), 'a mixed-in method'
expect(Robot.ancestors.take(2)).to eq(___), 'the module sits above the class'
expect(Robot.include?(Greeter)).to eq(___), 'include?'
expect(Robot.new).to be_a(___), 'its objects count as Greeters'
