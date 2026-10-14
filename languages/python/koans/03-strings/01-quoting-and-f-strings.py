# title: Quoting and f-strings
# intro: Single and double quotes make the same strings. An f-string puts values into text: anything in `{}` is computed, and a format after `:` shapes it.
name = 'Ada'
assert_equal(f'Hello, {name}!', ___, 'an f-string fills in a variable')
assert_equal(f'{2 + 3}', ___, 'or any expression')
assert_equal(f'{3.14159:.2f}', ___, ':.2f keeps two decimals')
assert_equal("It's" == 'It\'s', ___, 'two ways to write a quote inside quotes')
assert_equal(len('héllo'), ___, 'len counts characters')
