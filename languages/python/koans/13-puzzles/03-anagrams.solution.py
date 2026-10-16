words = ['listen', 'silent', 'enlist', 'google', 'gooegl', 'cat', 'act']
groups = {}
for w in words:
    groups.setdefault(''.join(sorted(w)), []).append(w)
assert groups['eilnst'] == ['listen', 'silent', 'enlist'], 'sorted letters are the key'
assert len(groups) == 3, 'how many groups'
assert groups['act'] == ['cat', 'act'], 'each group keeps the original order'
assert (sorted('dusty') == sorted('study')) is True, 'a quick anagram test'
