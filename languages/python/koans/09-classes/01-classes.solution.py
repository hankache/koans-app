class Dog:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f'{self.name} says woof'

rex = Dog('Rex')
assert rex.name == 'Rex', '__init__ set the name'
assert rex.speak() == 'Rex says woof', 'self is rex'
assert isinstance(rex, Dog), 'rex is a Dog'
assert type(rex).__name__ == 'Dog', 'its class knows its name'
