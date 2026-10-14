# title: Keyword-only and positional-only
# intro: Parameters after a `*` can only be given by name; parameters before a `/` can only be given by position.
def move(x, y, *, speed):
    return x + y + speed

assert move(1, 2, speed=3) == ___, 'speed must be named'
with pytest.raises(___):  # not by position
    move(1, 2, 3)

def area(width, height, /):
    return width * height

assert area(2, 3) == ___, 'by position'
with pytest.raises(___):  # not by name
    area(width=2, height=3)
