class Countdown
  include Enumerable

  def initialize(from) = @from = from

  def each
    @from.downto(1) { |n| yield n }
  end
end
c = Countdown.new(4)
expect(c.to_a).to eq([4, 3, 2, 1]), 'each is all it needed'
expect(c.select(&:even?)).to eq([4, 2]), 'select comes free'
expect(c.sort).to eq([1, 2, 3, 4]), 'so does sort'
expect(c.include?(3)).to eq(true), 'and include?'
expect(c.min_by { |n| (n - 2.6).abs }).to eq(3), 'and min_by'
