class Counter:
    created = 0

    def __init__(self):
        Counter.created += 1
        self.value = 0

a = Counter()
b = Counter()
assert Counter.created == 2, 'a class attribute is shared'
a.value = 5
assert b.value == 0, 'an instance attribute is not'
a.created = 100
assert Counter.created == 2, 'assigning on an instance hides the class attribute'
assert b.created == 2, 'for that instance only'
