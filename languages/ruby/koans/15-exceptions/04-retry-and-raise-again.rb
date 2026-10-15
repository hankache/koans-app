# title: retry and raising again
# intro: `retry` runs the `begin` block again; a bare `raise` in a `rescue` passes the same exception on. `cause` remembers what an exception replaced.
attempts = 0
result = begin
  attempts += 1
  raise 'flaky' if attempts < 3
  "succeeded after #{attempts}"
rescue
  retry
end
expect(result).to eq(___), 'retry tries again'
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
expect(error.message).to eq(___), 'the new exception'
expect(error.cause).to be_a(___), 'remembers its cause'
