# title: Custom exceptions
# intro: Your own exceptions inherit from `StandardError`, can carry data, and can give a default message.
class OutOfStock < StandardError
  attr_reader :item

  def initialize(item)
    @item = item
    super("#{item} is out of stock")
  end
end
def buy(item) = raise(OutOfStock, item)
expect { buy('tea') }.to raise_error(OutOfStock, ___), 'the message'
error = begin
  buy('cake')
rescue OutOfStock => e
  e
end
expect(error.item).to eq(___), 'it carries data'
expect(error).to be_a(___), 'and is a StandardError'
