class Positive:
    def __set_name__(self, owner, name):
        self.store = '_' + name

    def __get__(self, obj, objtype=None):
        return getattr(obj, self.store)

    def __set__(self, obj, value):
        if value <= 0:
            raise ValueError('must be positive')
        setattr(obj, self.store, value)


class Order:
    quantity = Positive()

    def __init__(self, quantity):
        self.quantity = quantity


o = Order(3)
assert o.quantity == 3, '__get__ runs on reading'
with pytest.raises(ValueError):  # __set__ runs on writing
    o.quantity = -1
assert vars(o) == {'_quantity': 3}, 'the value is stored under another name'
assert Order.__dict__['quantity'].store == '_quantity', '__set_name__ told it its name'
assert isinstance(Order.__dict__['quantity'], Positive) is True, 'the class holds the descriptor itself'
