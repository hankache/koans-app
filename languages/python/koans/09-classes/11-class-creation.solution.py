class Plugin:
    registry = []

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        Plugin.registry.append(cls.__name__)


class Csv(Plugin):
    pass


class Json(Plugin):
    pass


assert Plugin.registry == ['Csv', 'Json'], '__init_subclass__ sees every subclass'


class Upper(type):
    def __new__(mcs, name, bases, namespace):
        renamed = {k if k.startswith('__') else k.upper(): v for k, v in namespace.items()}
        return super().__new__(mcs, name, bases, renamed)


class Config(metaclass=Upper):
    debug = True


assert hasattr(Config, 'DEBUG') is True, 'a metaclass can reshape the class'
assert type(Config) is Upper, "a class's type is its metaclass"
assert type(int) is type, 'which is usually type'
assert isinstance(Config, type) is True, 'a class is an instance of type'
