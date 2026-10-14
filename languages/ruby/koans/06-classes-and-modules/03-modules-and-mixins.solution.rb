class Version
  include Comparable
  attr_reader :major, :minor

  def initialize(major, minor)
    @major = major
    @minor = minor
  end

  def <=>(other) = [major, minor] <=> [other.major, other.minor]
end
older = Version.new(1, 2)
newer = Version.new(1, 10)
assert_equal true, older < newer, 'Comparable builds < on <=>'
assert_equal 2, [newer, older].min.minor, 'and min'
assert_equal true, Version.include?(Comparable), 'the class includes the module'
module Doubler
  def self.double(n) = n * 2
end
assert_equal 8, Doubler.double(4), 'a module can hold methods of its own'
