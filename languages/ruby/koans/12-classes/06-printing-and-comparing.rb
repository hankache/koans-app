# title: Printing and comparing
# intro: Define `to_s` for how an object prints, `==` for equality, and `eql?` with `hash` so it works as a hash key or in `uniq`.
class Coin
  attr_reader :cents

  def initialize(cents) = @cents = cents
  def to_s = "#{cents}c"
  def ==(other) = other.is_a?(Coin) && cents == other.cents
  alias eql? ==
  def hash = cents.hash
end
expect("I found #{Coin.new(5)}").to eq(___), 'interpolation uses to_s'
expect(Coin.new(5) == Coin.new(5)).to eq(___), 'our =='
expect([Coin.new(1), Coin.new(1)].uniq.size).to eq(___), 'uniq uses eql? and hash'
expect({ Coin.new(2) => 'two' }[Coin.new(2)]).to eq(___), 'and so do hash keys'
