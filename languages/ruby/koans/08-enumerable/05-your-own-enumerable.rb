# title: Your own Enumerable
# intro: Include `Enumerable` and define `each`, and a class gets `map`, `select`, `sort`, `include?` and dozens more.
class Countdown
  include Enumerable

  def initialize(from) = @from = from

  def each
    @from.downto(1) { |n| yield n }
  end
end
c = Countdown.new(4)
expect(c.to_a).to eq(___), 'each is all it needed'
expect(c.select(&:even?)).to eq(___), 'select comes free'
expect(c.sort).to eq(___), 'so does sort'
expect(c.include?(3)).to eq(___), 'and include?'
expect(c.min_by { |n| (n - 2.6).abs }).to eq(___), 'and min_by'
