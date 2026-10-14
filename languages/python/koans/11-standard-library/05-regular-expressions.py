# title: Regular expressions
# intro: The `re` module searches text with patterns: `search` finds the first match, `findall` every one, `sub` replaces, and groups capture parts.
import re

assert re.search(r'\d+', 'order 42 shipped').group() == ___, 'search finds the first match'
assert re.findall(r'\d+', 'a1b22c333') == ___, 'findall finds them all'
assert re.sub(r'\s+', ' ', 'too   many    spaces') == ___, 'sub replaces'
m = re.match(r'(?P<year>\d{4})-(?P<month>\d\d)', '2026-10')
assert m['month'] == ___, 'named groups'
assert re.split(r'[,;]\s*', 'a, b;c') == ___, 'split on a pattern'
assert re.fullmatch(r'[a-z]+', 'abc1') is ___, 'fullmatch wants the whole string'
