import re
from itertools import groupby


def encode(s):
    return ''.join(f'{len(list(run))}{ch}' for ch, run in groupby(s))


def decode(s):
    return ''.join(ch * int(n) for n, ch in re.findall(r'(\d+)(\D)', s))


assert encode('aaabcc') == '3a1b2c', 'each run becomes a count and a letter'
assert [k for k, _ in groupby('aabbbac')] == ['a', 'b', 'a', 'c'], 'groupby groups runs, not equal values'
assert decode('2x3y') == 'xxyyy', 'decoding repeats each letter'
assert decode(encode('hello')) == 'hello', 'the round trip'
