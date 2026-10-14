# title: nil
# intro: `nil` is Ruby's "no value". It's an object like any other, with methods of its own, and `&.` calls a method only when there is something to call it on.
assert_equal ___, nil.class, 'nil is the only NilClass'
assert_equal ___, nil.nil?, 'nil? asks whether it is nil'
assert_equal ___, nil.to_s, 'it turns into an empty string'
assert_equal ___, nil.to_a, 'and into an empty array'
name = nil
assert_equal ___, name&.upcase, '&. stops at nil instead of raising'
assert_raises(___) { name.upcase }
