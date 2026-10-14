def move(x, y, *, speed):
    return x + y + speed

assert move(1, 2, speed=3) == 6, 'speed must be named'
with pytest.raises(TypeError):  # not by position
    move(1, 2, 3)

def area(width, height, /):
    return width * height

assert area(2, 3) == 6, 'by position'
with pytest.raises(TypeError):  # not by name
    area(width=2, height=3)
