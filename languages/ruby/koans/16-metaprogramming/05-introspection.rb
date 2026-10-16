# title: Introspection
# intro: An object can be asked about itself: its instance variables, the methods it answers, and its class's ancestors. `send` can even call private methods; `public_send` can't.
class Robot
  attr_reader :name

  def initialize
    @name = 'R2'
    @serial = 7
  end

  def beep = 'beep'

  private def secret = 42
end
robot = Robot.new
expect(robot.instance_variables).to eq(___), 'what an object holds'
expect(robot.instance_variable_get(:@serial)).to eq(___), 'read from outside'
expect(robot.respond_to?(:secret)).to eq(___), 'respond_to? ignores private methods'
expect(robot.send(:secret)).to eq(___), 'send can call them anyway'
expect { robot.public_send(:secret) }.to raise_error(___), 'public_send cannot'
expect(Robot.instance_methods(false).sort).to eq(___), 'the public methods Robot defines itself'
expect(Robot.ancestors.first(2)).to eq(___), 'where Ruby looks for methods'
