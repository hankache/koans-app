assert_equal ['a', 'b', 'c'], 'a,b,c'.split(','), 'split at commas'
assert_equal 'x-y-z', %w[x y z].join('-'), 'join with a dash'
assert_equal '3.14', format('%.2f', 3.14159), 'two decimals'
assert_equal '00042', format('%05d', 42), 'padded with zeros'
assert_equal 'this and that', '%s and %s' % ['this', 'that'], '% does the same'
text = <<~TEXT
  one
  two
TEXT
assert_equal "one\ntwo\n", text, '<<~ removes the indentation'
