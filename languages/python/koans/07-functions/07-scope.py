# title: Scope
# intro: Python looks a name up locally, then in enclosing functions, then globally, then among the built-ins. Assigning to a name inside a function makes it local, unless it is declared `global`.
level = 'global'

def read():
    return level

assert read() == ___, 'a function can read a global'
count = 0

def bump():
    count += 1

with pytest.raises(___):  # assigning makes count local
    bump()

def bump_global():
    global count
    count += 1

bump_global()
assert count == ___, 'global lets a function assign to it'
