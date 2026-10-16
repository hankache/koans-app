# title: Run-length encoding
# intro: Run-length encoding squeezes repeats: `aaab` becomes `3a1b`. `itertools.groupby` finds the runs, and a regular expression undoes them.
import re
from itertools import groupby


def encode(s):
    return ''.join(f'{len(list(run))}{ch}' for ch, run in groupby(s))


def decode(s):
    return ''.join(ch * int(n) for n, ch in re.findall(r'(\d+)(\D)', s))


assert encode('aaabcc') == ___, 'each run becomes a count and a letter'
assert [k for k, _ in groupby('aabbbac')] == ___, 'groupby groups runs, not equal values'
assert decode('2x3y') == ___, 'decoding repeats each letter'
assert decode(encode('hello')) == ___, 'the round trip'
