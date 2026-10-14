# title: Symbols
# intro: A symbol like `:name` is a name, not text. Each symbol exists only once, which makes symbols cheap to compare and good as hash keys.
assert_equal ___, :ruby.class, 'a symbol'
assert_equal ___, :a.equal?(:a), 'each symbol exists once'
assert_equal ___, 'a'.equal?('a'), 'unlike strings'
assert_equal ___, 'name'.to_sym, 'a string can become a symbol'
assert_equal ___, :name.to_s, 'and back'
assert_equal ___, %i[a b], '%i makes an array of symbols'
