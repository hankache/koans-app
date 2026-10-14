a = 'koan'
b = 'koan'
assert_equal true, a == b, '== compares values'
assert_equal false, a.equal?(b), 'but two literals make two objects'
c = a
assert_equal true, a.equal?(c), 'c names the same object as a'
assert_equal true, 1 == 1.0, 'an Integer equals the Float with the same value'
assert_equal false, 1.eql?(1.0), 'but eql? wants the same type too'
