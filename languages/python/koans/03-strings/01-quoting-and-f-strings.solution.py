name = 'Ada'
assert f'Hello, {name}!' == 'Hello, Ada!', 'an f-string fills in a variable'
assert f'{2 + 3}' == '5', 'or any expression'
assert f'{name.upper()}' == 'ADA', 'including method calls'
assert "It's" == 'It\'s', 'two ways to write a quote inside quotes'
assert len('héllo') == 5, 'len counts characters'
x = 42
assert f'{x=}' == 'x=42', '= shows the expression and its value'
