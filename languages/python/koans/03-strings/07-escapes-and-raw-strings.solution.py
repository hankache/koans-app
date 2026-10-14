assert len('a\nb') == 3, '\\n is one character'
assert len(r'a\nb') == 4, 'in a raw string it is two'
assert 'tab\there'.split('\t') == ['tab', 'here'], '\\t is a tab'
text = '''first
second'''
assert text.count('\n') == 1, 'triple quotes keep the line break'
assert '\u00e9' == 'é', '\\u gives a character by its code point'
