name = 'Ada'
assert_equal(f'Hello, {name}!', 'Hello, Ada!', 'an f-string fills in a variable')
assert_equal(f'{2 + 3}', '5', 'or any expression')
assert_equal(f'{3.14159:.2f}', '3.14', ':.2f keeps two decimals')
assert_equal("It's" == 'It\'s', True, 'two ways to write a quote inside quotes')
assert_equal(len('héllo'), 5, 'len counts characters')
