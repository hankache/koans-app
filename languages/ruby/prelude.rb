# Run before every koan. The build wraps all of it in one eval("…") on ONE line, so error line
# numbers shift by exactly one, and the koan runs at the top level, where these methods are
# defined. Every run gets a fresh Ruby, so nothing here or in a koan leaks into the next run.
#
# Koans are written the RSpec way: expect(actual).to eq(expected), 'description', and
# expect { code }.to raise_error(Class), 'description'. RSpec's own second argument to `to` is a
# failure message; here it describes the test. Unlike RSpec, a failing expectation prints TAP and
# the koan carries on, so every blank can be checked. Each failure also reports the learner's line
# as "# at web line N".

$stdout.sync = true
$stderr.sync = true

# ___: a unique value. Any expectation given it fails, whatever the matcher.
class KoanBlank
  def inspect = "___"
  alias to_s inspect
end
KOAN_BLANK = KoanBlank.new.freeze

def ___ = KOAN_BLANK

$koan_tests = 0

# The koan's line that made this call: the first frame in koan.rb below the prelude (line 1).
def koan_line
  location = caller_locations.find { |l| l.path == "koan.rb" && l.lineno > 1 }
  location ? location.lineno : 0
end

def koan_report(ok, msg, diag = [])
  $koan_tests += 1
  $stdout.puts "#{ok ? "ok" : "not ok"} #{$koan_tests}#{msg ? " - #{msg}" : ""}"
  unless ok
    diag.each { |d| $stderr.puts "# #{d}" }
    $stderr.puts "# at web line #{koan_line}"
  end
  ok
end

# A matcher: its arguments (to spot a blank among them), whether it wants a block, and a test that
# returns [ok, what was expected, what was got].
class KoanMatcher
  attr_reader :args

  def initialize(args, block: false, &test)
    @args, @block, @test = args, block, test
  end

  def block? = @block
  def blank? = @args.any? { |a| KoanMatcher.blank?(a) }
  def check(actual) = @test.call(actual)

  # For chained modifiers: be_within(d).of(x), change { }.by(n), …
  def with(*more, &test) = KoanMatcher.new(@args + more, block: @block, &test)

  def self.blank?(value) = value.equal?(KOAN_BLANK) || (value.is_a?(KoanMatcher) && value.blank?)
end

# The value or block given to expect, with to, not_to and to_not.
class KoanTarget
  def initialize(value, block)
    @value, @block = value, block
  end

  def to(matcher = nil, message = nil) = koan_expect(matcher, message, false)
  def not_to(matcher = nil, message = nil) = koan_expect(matcher, message, true)
  alias to_not not_to

  private

  def koan_expect(matcher, message, negated)
    raise ArgumentError, "to needs a matcher, like eq(…)" unless matcher.is_a?(KoanMatcher)
    return koan_report(false, message) if KoanMatcher.blank?(@value) || matcher.blank?
    return koan_report(false, message, ["this matcher needs a block: expect { … }"]) if matcher.block? && !@block
    return koan_report(false, message, ["this matcher needs a value: expect(…)"]) if !matcher.block? && @block
    ok, expected, got = matcher.check(matcher.block? ? @block : @value)
    ok = !ok if negated
    koan_report(ok, message, ["expected: #{negated ? "not " : ""}#{expected}", "     got: #{got}"])
  end
end

def expect(value = nil, &block) = KoanTarget.new(value, block)

# --- Equality and identity

def eq(expected) = KoanMatcher.new([expected]) { |a| [a == expected, expected.inspect, a.inspect] }
def eql(expected) = KoanMatcher.new([expected]) { |a| [a.eql?(expected), expected.inspect, a.inspect] }

def equal(expected)
  KoanMatcher.new([expected]) do |a|
    [a.equal?(expected), "the very object #{expected.inspect}", a.equal?(expected) ? "that object" : "#{a.inspect}, a different object"]
  end
end

# be with an argument is identity; without one, truthiness, and it takes a comparison: be > 3.
class KoanBe < KoanMatcher
  def initialize = super([]) { |a| [a ? true : false, "something truthy", a.inspect] }

  %i[< <= > >= ==].each do |op|
    define_method(op) do |other|
      KoanMatcher.new([other]) { |a| [a.public_send(op, other) ? true : false, "#{op} #{other.inspect}", a.inspect] }
    end
  end
end

def be(*args) = args.empty? ? KoanBe.new : equal(args.first)
def be_truthy = KoanMatcher.new([]) { |a| [a ? true : false, "something truthy", a.inspect] }
def be_falsey = KoanMatcher.new([]) { |a| [a ? false : true, "nil or false", a.inspect] }
alias be_falsy be_falsey
def be_nil = KoanMatcher.new([]) { |a| [a.nil?, "nil", a.inspect] }

# --- Types

def be_a(cls) = KoanMatcher.new([cls]) { |a| [a.is_a?(cls), cls.inspect, a.class.inspect] }
alias be_an be_a
alias be_kind_of be_a
def be_an_instance_of(cls) = KoanMatcher.new([cls]) { |a| [a.instance_of?(cls), cls.inspect, a.class.inspect] }
alias be_instance_of be_an_instance_of

def respond_to(*names)
  KoanMatcher.new(names) { |a| [names.all? { |n| a.respond_to?(n) }, "something that responds to #{names.map(&:inspect).join(", ")}", a.inspect] }
end

# --- Numbers

def be_within(delta)
  matcher = KoanMatcher.new([delta]) { [false, "be_within(…).of(…)", "no .of(…)"] }
  matcher.define_singleton_method(:of) do |expected|
    with(expected) { |a| [(a - expected).abs <= delta, "#{expected.inspect} ± #{delta.inspect}", a.inspect] }
  end
  matcher
end

def be_between(min, max)
  matcher = KoanMatcher.new([min, max]) { |a| [a.between?(min, max), "between #{min.inspect} and #{max.inspect}", a.inspect] }
  matcher.define_singleton_method(:inclusive) { self }
  matcher.define_singleton_method(:exclusive) do
    with { |a| [a > min && a < max, "between #{min.inspect} and #{max.inspect}, exclusive", a.inspect] }
  end
  matcher
end

# --- Collections and strings

def koan_include(*items)
  KoanMatcher.new(items) do |a|
    ok = items.all? do |item|
      a.is_a?(Hash) && item.is_a?(Hash) ? item.all? { |k, v| a.key?(k) && a[k] == v } : a.include?(item)
    end
    [ok, "something including #{items.map(&:inspect).join(", ")}", a.inspect]
  end
end

def include(*items) = koan_include(*items)

# At the top level, include is main's own method, for modules: keep that, and add the matcher.
class << self
  def include(*items) = items.empty? || !items.all?(Module) ? koan_include(*items) : Object.include(*items)
end

def contain_exactly(*items)
  KoanMatcher.new(items) { |a| [a.to_a.tally == items.tally, "#{items.inspect}, in any order", a.inspect] }
end

def match_array(items) = contain_exactly(*items)

def start_with(*prefix)
  KoanMatcher.new(prefix) do |a|
    ok = a.is_a?(String) ? prefix.all? { |p| a.start_with?(p) } : a.first(prefix.size) == prefix
    [ok, "something starting with #{prefix.map(&:inspect).join(", ")}", a.inspect]
  end
end

def end_with(*suffix)
  KoanMatcher.new(suffix) do |a|
    ok = a.is_a?(String) ? suffix.all? { |s| a.end_with?(s) } : a.last(suffix.size) == suffix
    [ok, "something ending with #{suffix.map(&:inspect).join(", ")}", a.inspect]
  end
end

def match(pattern)
  KoanMatcher.new([pattern]) { |a| [a.match?(pattern), "something matching #{pattern.inspect}", a.inspect] }
end

def have_attributes(attributes)
  KoanMatcher.new([attributes, *attributes.values]) do |a|
    got = attributes.to_h { |k, _| [k, a.respond_to?(k) ? a.public_send(k) : :"(no #{k})"] }
    [got == attributes, attributes.inspect, got.inspect]
  end
end

def all(matcher)
  KoanMatcher.new([matcher]) do |a|
    bad = a.find { |item| !matcher.check(item)[0] }
    [bad.nil?, "every item to match", bad.nil? ? a.inspect : "#{bad.inspect}, which doesn't"]
  end
end

def satisfy(description = "a condition", &test)
  KoanMatcher.new([]) { |a| [test.call(a) ? true : false, description, a.inspect] }
end

# be_empty, be_even, be_frozen… ask empty?, even?, frozen?; have_key(:k) asks has_key?(:k).
module KoanPredicates
  def method_missing(name, *args, &block)
    if (m = /\Abe_(\w+)\z/.match(name))
      predicate = :"#{m[1]}?"
      KoanMatcher.new(args) { |a| [a.public_send(predicate, *args) ? true : false, "#{predicate} to be true", a.inspect] }
    elsif (m = /\Ahave_(\w+)\z/.match(name))
      predicate = :"has_#{m[1]}?"
      KoanMatcher.new(args) { |a| [a.public_send(predicate, *args) ? true : false, "#{predicate} to be true", a.inspect] }
    else
      super
    end
  end

  def respond_to_missing?(name, include_private = false) = /\A(be|have)_\w+\z/.match?(name) || super
end
extend KoanPredicates

# --- Blocks

# raise_error, raise_error(Class), raise_error('message' or /pattern/), raise_error(Class, message).
def raise_error(cls = nil, message = nil)
  cls, message = nil, cls if !cls.nil? && !cls.is_a?(Module) && !cls.equal?(KOAN_BLANK)
  wanted = [cls&.inspect, message&.inspect].compact.join(" with message ")
  wanted = "an error" if wanted.empty?
  KoanMatcher.new([cls, message].compact, block: true) do |block|
    block.call
    [false, wanted, "no error"]
  rescue Exception => e
    class_ok = cls.nil? || e.is_a?(cls)
    message_ok = message.nil? || (message.is_a?(Regexp) ? message.match?(e.message) : e.message == message)
    [class_ok && message_ok, wanted, class_ok ? "#{e.class.inspect} with message #{e.message.inspect}" : e.class.inspect]
  end
end
alias raise_exception raise_error

# change { value }, then .by(n), .from(a), .to(b): what running the block does to the value.
def change(&value)
  matcher = KoanMatcher.new([], block: true) do |block|
    before = value.call
    block.call
    after = value.call
    [before != after, "a change from #{before.inspect}", after.inspect]
  end
  koan_change_chain(matcher, value, {})
end

def koan_change_chain(matcher, value, wanted)
  %i[by from to].each do |kind|
    matcher.define_singleton_method(kind) do |expected|
      wants = wanted.merge(kind => expected)
      chained = with(expected) do |block|
        before = value.call
        block.call
        after = value.call
        got = { by: after - before, from: before, to: after }
        failed = wants.find { |k, want| got[k] != want }
        failed ? [false, failed[1].inspect, got[failed[0]].inspect] : [true, "", ""]
      end
      koan_change_chain(chained, value, wants)
    end
  end
  matcher
end

# What puts and print write, for output(…).to_stdout.
class KoanCapture
  attr_reader :text

  def initialize = @text = +""
  def write(*parts) = parts.sum { |p| s = p.to_s; @text << s; s.size }
  def print(*parts) = (write(*parts); nil)
  def flush = self
  def sync = true
  def sync=(_)
  end

  def puts(*items)
    items = [""] if items.empty?
    items.flatten.each { |i| s = i.nil? ? "" : i.to_s; write(s.end_with?("\n") ? s : "#{s}\n") }
    nil
  end
end

def output(expected = nil)
  matcher = KoanMatcher.new(expected.nil? ? [] : [expected], block: true) do |block|
    capture = KoanCapture.new
    saved, $stdout = $stdout, capture
    begin
      block.call
    ensure
      $stdout = saved
    end
    text = capture.text
    ok = expected.nil? ? !text.empty? : expected.is_a?(Regexp) ? expected.match?(text) : text == expected
    [ok, expected.nil? ? "some output" : expected.inspect, text.inspect]
  end
  matcher.define_singleton_method(:to_stdout) { self }
  matcher
end
