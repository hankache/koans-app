# title: Inheritance
# intro: A subclass inherits its parent's methods and can override them. `super()` calls the parent's version.
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f'{self.name} makes a sound'

class Dog(Animal):
    def speak(self):
        return super().speak().replace('makes a sound', 'barks')

class Puppy(Dog):
    pass

assert Dog('Rex').speak() == ___, 'super calls the parent method'
assert Puppy('Bit').speak() == ___, 'Puppy inherits from Dog'
assert issubclass(Puppy, ___), 'and through it from Animal'
assert [c.__name__ for c in Puppy.__mro__][:3] == ___, 'the order methods are looked up in'
