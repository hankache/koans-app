# title: Equality
# intro: `==` compares values, `equal?` asks whether two names point to the same object, and `eql?` also wants the same type: `1 == 1.0`, but `1` isn't `eql?` to `1.0`.
a = 'koan'
b = 'koan'
assert_equal ___, a == b, '== compares values'
assert_equal ___, a.equal?(b), 'but two literals make two objects'
c = a
assert_equal ___, a.equal?(c), 'c names the same object as a'
assert_equal ___, 1 == 1.0, 'an Integer equals the Float with the same value'
assert_equal ___, 1.eql?(1.0), 'but eql? wants the same type too'
