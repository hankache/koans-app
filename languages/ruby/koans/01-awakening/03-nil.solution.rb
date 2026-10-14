assert_equal NilClass, nil.class, 'nil is the only NilClass'
assert_equal true, nil.nil?, 'nil? asks whether it is nil'
assert_equal '', nil.to_s, 'it turns into an empty string'
assert_equal [], nil.to_a, 'and into an empty array'
name = nil
assert_equal nil, name&.upcase, '&. stops at nil instead of raising'
assert_raises(NoMethodError) { name.upcase }
