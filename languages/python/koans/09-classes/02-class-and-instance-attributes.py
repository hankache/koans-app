# title: Class and instance attributes
# intro: An attribute set on the class is shared by every instance; one set on an instance belongs to it alone and hides the class's.
class Counter:
    created = 0

    def __init__(self):
        Counter.created += 1
        self.value = 0

a = Counter()
b = Counter()
assert Counter.created == ___, 'a class attribute is shared'
a.value = 5
assert b.value == ___, 'an instance attribute is not'
a.created = 100
assert Counter.created == ___, 'assigning on an instance hides the class attribute'
assert b.created == ___, 'for that instance only'
