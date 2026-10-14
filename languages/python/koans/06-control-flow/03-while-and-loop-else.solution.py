n = 1
while n < 100:
    n *= 2
assert n == 128, 'while repeats until the condition fails'
odds = []
for i in range(6):
    if i % 2 == 0:
        continue
    odds.append(i)
assert odds == [1, 3, 5], 'continue skips to the next round'

def find(items, wanted):
    for item in items:
        if item == wanted:
            result = 'found'
            break
    else:
        result = 'missing'
    return result

assert find([1, 2], 2) == 'found', 'break skips the else'
assert find([1, 2], 3) == 'missing', 'the else runs when the loop finishes'
