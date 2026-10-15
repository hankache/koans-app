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
expect(lamp.describe).to eq('green lamp, off'), 'initialize set the state'
expect(lamp.toggle.describe).to eq('green lamp, on'), 'returning self lets calls chain'
expect(lamp.instance_variables).to eq([:@color, :@on]), 'its instance variables'
expect { lamp.color }.to raise_error(NoMethodError), 'which are not readable from outside'
