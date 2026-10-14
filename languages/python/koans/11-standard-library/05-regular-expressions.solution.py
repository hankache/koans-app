import re

assert re.search(r'\d+', 'order 42 shipped').group() == '42', 'search finds the first match'
assert re.findall(r'\d+', 'a1b22c333') == ['1', '22', '333'], 'findall finds them all'
assert re.sub(r'\s+', ' ', 'too   many    spaces') == 'too many spaces', 'sub replaces'
m = re.match(r'(?P<year>\d{4})-(?P<month>\d\d)', '2026-10')
assert m['month'] == '10', 'named groups'
assert re.split(r'[,;]\s*', 'a, b;c') == ['a', 'b', 'c'], 'split on a pattern'
assert re.fullmatch(r'[a-z]+', 'abc1') is None, 'fullmatch wants the whole string'
