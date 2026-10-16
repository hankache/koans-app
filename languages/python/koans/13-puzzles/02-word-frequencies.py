# title: Word frequencies
# intro: Counting how often each word appears is one line with `Counter`, which also sorts by count.
from collections import Counter

text = 'the cat and the hat and the bat'
tally = Counter(text.split())
assert tally['the'] == ___, 'how often "the" appears'
assert tally.most_common(2) == ___, 'the two most common'
assert tally['dog'] == ___, 'a word never seen counts zero'
assert len(tally) == ___, 'how many different words'
assert tally.total() == ___, 'and how many in all'
