# title: Escapes and raw strings
# intro: A backslash starts an escape: `\\n` is a new line, `\\t` a tab. In a raw string, `r'…'`, backslashes are just backslashes. Triple quotes span lines.
assert len('a\nb') == ___, '\\n is one character'
assert len(r'a\nb') == ___, 'in a raw string it is two'
assert 'tab\there'.split('\t') == ___, '\\t is a tab'
text = '''first
second'''
assert text.count('\n') == ___, 'triple quotes keep the line break'
assert '\u00e9' == ___, '\\u gives a character by its code point'
