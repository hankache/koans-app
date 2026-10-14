# title: Quoting and f-strings
# intro: Single and double quotes make the same strings. An f-string puts values into text: anything in `{}` is computed.
name = 'Ada'
assert f'Hello, {name}!' == ___, 'an f-string fills in a variable'
assert f'{2 + 3}' == ___, 'or any expression'
assert f'{name.upper()}' == ___, 'including method calls'
assert "It's" == 'It\'s', 'two ways to write a quote inside quotes'
assert len('héllo') == ___, 'len counts characters'
x = 42
assert f'{x=}' == ___, '= shows the expression and its value'
