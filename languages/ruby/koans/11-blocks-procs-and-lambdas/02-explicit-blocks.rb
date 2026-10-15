# title: Explicit blocks
# intro: `&block` in the parameters turns a block into a `Proc` object, which can be stored and called later.
class Button
  def on_click(&handler)
    @handler = handler
  end

  def click = @handler.call('clicked')
end
b = Button.new
b.on_click { |event| event.upcase }
expect(b.click).to eq(___), 'a stored block, called later'
def run(&block) = block
expect(run { 1 }.class).to eq(___), 'a block becomes a Proc'
expect([1, 2].map(&run { |n| n + 1 })).to eq(___), 'and & turns it back into a block'
