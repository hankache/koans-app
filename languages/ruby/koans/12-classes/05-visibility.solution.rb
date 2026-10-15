class Wallet
  def initialize(cents) = @cents = cents

  def richer_than?(other) = cents > other.cents

  def summary = "#{format_cents}"

  protected

  attr_reader :cents

  private

  def format_cents = format('$%.2f', @cents / 100.0)
end
a = Wallet.new(500)
b = Wallet.new(300)
expect(a.richer_than?(b)).to eq(true), 'protected works between wallets'
expect { a.cents }.to raise_error(NoMethodError), 'but not from outside'
expect(a.summary).to eq('$5.00'), 'private methods serve the public ones'
expect(a.send(:format_cents)).to eq('$5.00'), 'send gets around it, so visibility is advice'
