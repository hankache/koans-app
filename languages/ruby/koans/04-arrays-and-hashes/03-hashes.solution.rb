ages = { 'Ada' => 36, 'Alan' => 41 }
assert_equal 36, ages['Ada'], 'look up a key'
assert_equal nil, ages['Grace'], 'a missing key gives nil'
assert_equal 0, ages.fetch('Grace', 0), 'fetch can give a default'
assert_raises(KeyError) { ages.fetch('Grace') }
assert_equal ['Ada', 'Alan'], ages.keys, 'keys keep the order they were added in'
counts = Hash.new(0)
counts[:a] += 1
assert_equal 1, counts[:a], 'a default of 0 makes counting easy'
assert_equal 0, counts[:b], 'missing keys read as the default'
