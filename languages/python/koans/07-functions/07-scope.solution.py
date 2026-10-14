level = 'global'

def read():
    return level

assert read() == 'global', 'a function can read a global'
count = 0

def bump():
    count += 1

with pytest.raises(UnboundLocalError):  # assigning makes count local
    bump()

def bump_global():
    global count
    count += 1

bump_global()
assert count == 1, 'global lets a function assign to it'
