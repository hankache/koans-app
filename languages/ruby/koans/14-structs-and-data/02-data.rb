# title: Data
# intro: `Data.define` makes immutable value objects: all fields required, no setters, and `with` for a changed copy.
Money = Data.define(:amount, :currency) do
  def to_s = format('%.2f %s', amount, currency)
end
price = Money.new(amount: 9.5, currency: 'EUR')
expect(price.to_s).to eq(___), 'keyword or positional arguments'
expect(price.frozen?).to eq(___), 'immutable'
expect(price.respond_to?(:amount=)).to eq(___), 'no setters'
cheaper = price.with(amount: 7)
expect(cheaper.amount).to eq(___), 'with makes a changed copy'
expect { Money.new(amount: 1) }.to raise_error(___), 'every field is required'
expect(price.to_h).to eq(___), 'to_h'
