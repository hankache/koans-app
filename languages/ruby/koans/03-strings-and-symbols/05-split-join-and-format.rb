# title: Split, join and format
# intro: `split` cuts a string into an array and `join` glues one together. `format` (or `%`) fills values into a template, and `<<~` starts a multi-line string with its indentation removed.
assert_equal ___, 'a,b,c'.split(','), 'split at commas'
assert_equal ___, %w[x y z].join('-'), 'join with a dash'
assert_equal ___, format('%.2f', 3.14159), 'two decimals'
assert_equal ___, format('%05d', 42), 'padded with zeros'
assert_equal ___, '%s and %s' % ['this', 'that'], '% does the same'
text = <<~TEXT
  one
  two
TEXT
assert_equal ___, text, '<<~ removes the indentation'
