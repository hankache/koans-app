message = begin
  1 / 0
rescue ZeroDivisionError => e
  e.message
end
assert_equal 'divided by 0', message, 'rescue catches the exception'
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
assert_equal 'not enough money', caught.message, 'an exception of your own'
assert_equal true, caught.is_a?(StandardError), 'built on StandardError'
log = []
begin
  raise 'oops'
rescue
  log << :rescued
ensure
  log << :ensured
end
assert_equal [:rescued, :ensured], log, 'ensure runs whatever happens'
attempts = 0
begin
  attempts += 1
  raise 'flaky' if attempts < 3
rescue
  retry
end
assert_equal 3, attempts, 'retry tries again'
