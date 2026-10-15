# title: Classes and instances
# intro: `initialize` sets up a new object; instance variables, written `@name`, hold its state, and are private to it.
class Lamp
  def initialize(color)
    @color = color
    @on = false
  end

  def toggle
    @on = !@on
    self
  end

  def describe = "#{@color} lamp, #{@on ? 'on' : 'off'}"
end
lamp = Lamp.new('green')
expect(lamp.describe).to eq(___), 'initialize set the state'
expect(lamp.toggle.describe).to eq(___), 'returning self lets calls chain'
expect(lamp.instance_variables).to eq(___), 'its instance variables'
expect { lamp.color }.to raise_error(___), 'which are not readable from outside'
