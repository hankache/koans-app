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
expect(robot.instance_variables).to eq(%i[@name @serial]), 'what an object holds'
expect(robot.instance_variable_get(:@serial)).to eq(7), 'read from outside'
expect(robot.respond_to?(:secret)).to eq(false), 'respond_to? ignores private methods'
expect(robot.send(:secret)).to eq(42), 'send can call them anyway'
expect { robot.public_send(:secret) }.to raise_error(NoMethodError), 'public_send cannot'
expect(Robot.instance_methods(false).sort).to eq(%i[beep name]), 'the public methods Robot defines itself'
expect(Robot.ancestors.first(2)).to eq([Robot, Object]), 'where Ruby looks for methods'
