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

with pytest.raises(TypeError):  # an abstract class cannot be instantiated
    Shape()
assert Square(3).describe() == 'area 9', 'the subclass fills in area'
