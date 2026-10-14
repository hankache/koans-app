# title: Exceptions
# intro: `raise` throws an exception and `rescue` catches it. `ensure` always runs, `retry` starts the `begin` block again, and your own exceptions are classes that inherit from `StandardError`.
message = begin
  1 / 0
rescue ZeroDivisionError => e
  e.message
end
assert_equal ___, message, 'rescue catches the exception'
class InsufficientFunds < StandardError
  def initialize(msg = 'not enough money')
    super
  end
end
caught = begin
  raise InsufficientFunds
rescue InsufficientFunds => e
  e
end
assert_equal ___, caught.message, 'an exception of your own'
assert_equal ___, caught.is_a?(StandardError), 'built on StandardError'
log = []
begin
  raise 'oops'
rescue
  log << :rescued
ensure
  log << :ensured
end
assert_equal ___, log, 'ensure runs whatever happens'
attempts = 0
begin
  attempts += 1
  raise 'flaky' if attempts < 3
rescue
  retry
end
assert_equal ___, attempts, 'retry tries again'
