# title: Abstract classes
# intro: A class inheriting from `ABC` with an `@abstractmethod` cannot be instantiated; a subclass must implement the method first.
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        ...

    def describe(self):
        return f'area {self.area()}'

class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2

with pytest.raises(___):  # an abstract class cannot be instantiated
    Shape()
assert Square(3).describe() == ___, 'the subclass fills in area'
