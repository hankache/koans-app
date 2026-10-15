Money = Data.define(:amount, :currency) do
  def to_s = format('%.2f %s', amount, currency)
end
price = Money.new(amount: 9.5, currency: 'EUR')
expect(price.to_s).to eq('9.50 EUR'), 'keyword or positional arguments'
expect(price.frozen?).to eq(true), 'immutable'
expect(price.respond_to?(:amount=)).to eq(false), 'no setters'
cheaper = price.with(amount: 7)
expect(cheaper.amount).to eq(7), 'with makes a changed copy'
expect { Money.new(amount: 1) }.to raise_error(ArgumentError), 'every field is required'
expect(price.to_h).to eq({ amount: 9.5, currency: 'EUR' }), 'to_h'
