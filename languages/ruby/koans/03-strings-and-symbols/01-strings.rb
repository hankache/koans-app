# title: Strings
# intro: Double quotes interpolate `#{…}` and understand escapes like `\\t`; single quotes take almost everything as it is.
name = 'Ada'
assert_equal ___, "Hello, #{name}!", 'double quotes interpolate'
assert_equal ___, 'a#{1}b'.length, 'single quotes do not'
assert_equal ___, "tab\tchar".length, '\\t is one tab character in double quotes'
assert_equal ___, 'tab\tchar'.length, 'and two characters in single quotes'
assert_equal ___, 'ab' * 3, '* repeats a string'
