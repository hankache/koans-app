# title: try and except
# intro: `except` catches an exception, `else` runs if none was raised, and `finally` runs no matter what.
log = []
try:
    1 / 0
except ZeroDivisionError:
    log.append('caught')
else:
    log.append('no error')
finally:
    log.append('finally')
assert log == ___, 'except, then finally'
log = []
try:
    log.append('fine')
except ZeroDivisionError:
    log.append('caught')
else:
    log.append('else')
assert log == ___, 'else runs when nothing was raised'
try:
    int('x')
except (ValueError, TypeError) as error:
    caught = type(error).__name__
assert caught == ___, 'one except can catch several types'
