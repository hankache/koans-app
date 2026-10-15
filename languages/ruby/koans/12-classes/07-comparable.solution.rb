class Version
  include Comparable
  attr_reader :parts

  def initialize(text) = @parts = text.split('.').map(&:to_i)
  def <=>(other) = parts <=> other.parts
  def to_s = parts.join('.')
end
expect(Version.new('1.10') > Version.new('1.9')).to eq(true), 'numbers, not text'
expect(Version.new('2.0').between?(Version.new('1.0'), Version.new('3.0'))).to eq(true), 'between?'
versions = %w[1.2 1.10 1.9].map { |v| Version.new(v) }
expect(versions.sort.map(&:to_s)).to eq(['1.2', '1.9', '1.10']), 'sort uses <=>'
expect(versions.max.to_s).to eq('1.10'), 'and so does max'
