class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @property
    def fahrenheit(self):
        return self.celsius * 9 / 5 + 32

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError('below absolute zero')
        self._celsius = value

t = Temperature(100)
assert t.fahrenheit == 212.0, 'a computed attribute'
t.celsius = 0
assert t.fahrenheit == 32.0, 'recomputed each time'
with pytest.raises(ValueError):  # the setter checks the value
    t.celsius = -300
