attempts = 0
result = begin
  attempts += 1
  raise 'flaky' if attempts < 3
  "succeeded after #{attempts}"
rescue
  retry
end
expect(result).to eq('succeeded after 3'), 'retry tries again'
def parse(text)
  Integer(text)
rescue ArgumentError
  raise TypeError, "not a number: #{text}"
end
error = begin
  parse('x')
rescue TypeError => e
  e
end
expect(error.message).to eq('not a number: x'), 'the new exception'
expect(error.cause).to be_a(ArgumentError), 'remembers its cause'
