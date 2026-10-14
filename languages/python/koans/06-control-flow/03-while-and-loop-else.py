# title: while and loop else
# intro: `while` repeats while its condition holds. `break` leaves a loop, `continue` skips to the next round, and a loop's `else` runs only if it was not broken out of.
n = 1
while n < 100:
    n *= 2
assert n == ___, 'while repeats until the condition fails'
odds = []
for i in range(6):
    if i % 2 == 0:
        continue
    odds.append(i)
assert odds == ___, 'continue skips to the next round'

def find(items, wanted):
    for item in items:
        if item == wanted:
            result = 'found'
            break
    else:
        result = 'missing'
    return result

assert find([1, 2], 2) == ___, 'break skips the else'
assert find([1, 2], 3) == ___, 'the else runs when the loop finishes'
