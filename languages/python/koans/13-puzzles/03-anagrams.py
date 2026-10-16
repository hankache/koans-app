# title: Anagrams
# intro: Two words are anagrams when they use the same letters. Sorting a word's letters gives a key that all its anagrams share.
words = ['listen', 'silent', 'enlist', 'google', 'gooegl', 'cat', 'act']
groups = {}
for w in words:
    groups.setdefault(''.join(sorted(w)), []).append(w)
assert groups['eilnst'] == ___, 'sorted letters are the key'
assert len(groups) == ___, 'how many groups'
assert groups['act'] == ___, 'each group keeps the original order'
assert (sorted('dusty') == sorted('study')) is ___, 'a quick anagram test'
