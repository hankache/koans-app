def power(base, exp=2):
    return base ** exp

assert power(3) == 9, 'the default fills in'
assert power(2, exp=10) == 1024, 'or is given by name'

def add_item(item, items=[]):
    items.append(item)
    return items

add_item('a')
assert add_item('b') == ['a', 'b'], 'the default list is shared between calls'

def add_item_safely(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

add_item_safely('a')
assert add_item_safely('b') == ['b'], 'a fresh list each time'
