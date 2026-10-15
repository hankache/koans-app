class OutOfStock < StandardError
  attr_reader :item

  def initialize(item)
    @item = item
    super("#{item} is out of stock")
  end
end
def buy(item) = raise(OutOfStock, item)
expect { buy('tea') }.to raise_error(OutOfStock, 'tea is out of stock'), 'the message'
error = begin
  buy('cake')
rescue OutOfStock => e
  e
end
expect(error.item).to eq('cake'), 'it carries data'
expect(error).to be_a(StandardError), 'and is a StandardError'
