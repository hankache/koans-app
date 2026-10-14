# title: Default arguments
# intro: A parameter can have a default value. The default is made once, when the function is defined, so a mutable default is shared between calls; `None` is the usual way around that.
def power(base, exp=2):
    return base ** exp

assert power(3) == ___, 'the default fills in'
assert power(2, exp=10) == ___, 'or is given by name'

def add_item(item, items=[]):
    items.append(item)
    return items

add_item('a')
assert add_item('b') == ___, 'the default list is shared between calls'

def add_item_safely(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

add_item_safely('a')
assert add_item_safely('b') == ___, 'a fresh list each time'
