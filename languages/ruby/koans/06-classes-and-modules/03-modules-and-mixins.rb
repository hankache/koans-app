# title: Modules and mixins
# intro: A module bundles methods. Including one mixes its methods into a class: `Comparable` gives you `<`, `between?` and the rest from a single `<=>`.
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
assert_equal ___, older < newer, 'Comparable builds < on <=>'
assert_equal ___, [newer, older].min.minor, 'and min'
assert_equal ___, Version.include?(Comparable), 'the class includes the module'
module Doubler
  def self.double(n) = n * 2
end
assert_equal ___, Doubler.double(4), 'a module can hold methods of its own'
