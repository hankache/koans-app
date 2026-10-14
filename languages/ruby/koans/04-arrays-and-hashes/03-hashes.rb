# title: Hashes
# intro: A hash maps keys to values. Reading a missing key gives `nil`, `fetch` raises or uses a default, and `Hash.new(0)` makes a hash whose missing keys read as 0.
ages = { 'Ada' => 36, 'Alan' => 41 }
assert_equal ___, ages['Ada'], 'look up a key'
assert_equal ___, ages['Grace'], 'a missing key gives nil'
assert_equal ___, ages.fetch('Grace', 0), 'fetch can give a default'
assert_raises(___) { ages.fetch('Grace') }
assert_equal ___, ages.keys, 'keys keep the order they were added in'
counts = Hash.new(0)
counts[:a] += 1
assert_equal ___, counts[:a], 'a default of 0 makes counting easy'
assert_equal ___, counts[:b], 'missing keys read as the default'
