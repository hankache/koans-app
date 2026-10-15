class Button
  def on_click(&handler)
    @handler = handler
  end

  def click = @handler.call('clicked')
end
b = Button.new
b.on_click { |event| event.upcase }
expect(b.click).to eq('CLICKED'), 'a stored block, called later'
def run(&block) = block
expect(run { 1 }.class).to eq(Proc), 'a block becomes a Proc'
expect([1, 2].map(&run { |n| n + 1 })).to eq([2, 3]), 'and & turns it back into a block'
