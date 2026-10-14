# title: Classes
# intro: A class makes objects. `__init__` sets a new object up, and `self` is the object a method was called on.
class Dog:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f'{self.name} says woof'

rex = Dog('Rex')
assert rex.name == ___, '__init__ set the name'
assert rex.speak() == ___, 'self is rex'
assert isinstance(rex, ___), 'rex is a Dog'
assert type(rex).__name__ == ___, 'its class knows its name'
