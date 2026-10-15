# title: Visibility
# intro: Methods are public unless marked. `private` ones can only be called without a receiver; `protected` ones can be called on other objects of the same class.
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
expect(a.richer_than?(b)).to eq(___), 'protected works between wallets'
expect { a.cents }.to raise_error(___), 'but not from outside'
expect(a.summary).to eq(___), 'private methods serve the public ones'
expect(a.send(:format_cents)).to eq(___), 'send gets around it, so visibility is advice'
