from collections import Counter

text = 'the cat and the hat and the bat'
tally = Counter(text.split())
assert tally['the'] == 3, 'how often "the" appears'
assert tally.most_common(2) == [('the', 3), ('and', 2)], 'the two most common'
assert tally['dog'] == 0, 'a word never seen counts zero'
assert len(tally) == 5, 'how many different words'
assert tally.total() == 8, 'and how many in all'
