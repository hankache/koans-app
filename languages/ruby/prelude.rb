# Run before every koan. The build wraps all of it in one eval("…") on ONE line, so error line
# numbers shift by exactly one, and the koan runs at the top level, where these methods are
# defined. Every run gets a fresh Ruby, so nothing here or in a koan leaks into the next run.
#
# The assertions are Minitest's (assert_equal expected, actual), and like Raku's Test module they
# print TAP: a failing assertion reports itself and the koan carries on, so every blank can be
# checked. Each failure also reports the learner's line as "# at web line N".

$stdout.sync = true
$stderr.sync = true

# ___: a unique value. Any assertion given it fails, whatever the assertion.
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

def koan_blank?(*args) = args.any? { |a| a.equal?(KOAN_BLANK) }

def koan_compare(ok, expected, actual, msg)
  koan_report(ok, msg, ["expected: #{expected.inspect}", "     got: #{actual.inspect}"])
end

# Passes when test is truthy.
def assert(test, msg = nil)
  return koan_report(false, msg) if koan_blank?(test)
  koan_report(test ? true : false, msg)
end

# Passes when test is falsy.
def refute(test, msg = nil)
  return koan_report(false, msg) if koan_blank?(test)
  koan_report(test ? false : true, msg)
end

# Passes when expected == actual.
def assert_equal(expected, actual, msg = nil)
  return koan_report(false, msg) if koan_blank?(expected, actual)
  koan_compare(expected == actual, expected, actual, msg)
end

# Passes when unexpected != actual.
def refute_equal(unexpected, actual, msg = nil)
  return koan_report(false, msg) if koan_blank?(unexpected, actual)
  koan_report(unexpected != actual, msg, ["didn't want: #{unexpected.inspect}"])
end

# Passes when obj is nil.
def assert_nil(obj, msg = nil)
  return koan_report(false, msg) if koan_blank?(obj)
  koan_compare(obj.nil?, nil, obj, msg)
end

# Passes when obj is a cls, or a subclass of it.
def assert_kind_of(cls, obj, msg = nil)
  return koan_report(false, msg) if koan_blank?(cls, obj)
  koan_compare(obj.kind_of?(cls), cls, obj.class, msg)
end

# Passes when obj is a cls, exactly.
def assert_instance_of(cls, obj, msg = nil)
  return koan_report(false, msg) if koan_blank?(cls, obj)
  koan_compare(obj.instance_of?(cls), cls, obj.class, msg)
end

# Passes when collection includes obj.
def assert_includes(collection, obj, msg = nil)
  return koan_report(false, msg) if koan_blank?(collection, obj)
  koan_report(collection.include?(obj), msg, ["#{collection.inspect} does not include #{obj.inspect}"])
end

# Passes when the regexp (or string) matcher matches obj.
def assert_match(matcher, obj, msg = nil)
  return koan_report(false, msg) if koan_blank?(matcher, obj)
  matcher = Regexp.new(Regexp.escape(matcher)) if matcher.is_a?(String)
  koan_compare(matcher.match?(obj), matcher, obj, msg)
end

# Passes when expected and actual are within delta of each other.
def assert_in_delta(expected, actual, delta = 0.001, msg = nil)
  return koan_report(false, msg) if koan_blank?(expected, actual)
  koan_compare((expected - actual).abs <= delta, expected, actual, msg)
end

# Passes when the block raises one of the classes (StandardError if none are given). A string
# after the classes is the message. Returns the exception, as Minitest does.
def assert_raises(*classes)
  msg = classes.last.is_a?(String) ? classes.pop : nil
  return koan_report(false, msg) if koan_blank?(*classes) || !block_given?
  classes = [StandardError] if classes.empty?
  wanted = classes.size == 1 ? classes.first : classes
  begin
    yield
  rescue *classes => e
    koan_report(true, msg)
    return e
  rescue Exception => e
    koan_compare(false, wanted, e.class, msg)
    return e
  end
  koan_report(false, msg, ["expected: #{wanted.inspect}", "     got: no exception"])
  nil
end
