log = []
try:
    1 / 0
except ZeroDivisionError:
    log.append('caught')
else:
    log.append('no error')
finally:
    log.append('finally')
assert log == ['caught', 'finally'], 'except, then finally'
log = []
try:
    log.append('fine')
except ZeroDivisionError:
    log.append('caught')
else:
    log.append('else')
assert log == ['fine', 'else'], 'else runs when nothing was raised'
try:
    int('x')
except (ValueError, TypeError) as error:
    caught = type(error).__name__
assert caught == 'ValueError', 'one except can catch several types'
