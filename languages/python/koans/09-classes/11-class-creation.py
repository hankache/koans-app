# title: Class creation hooks
# intro: `__init_subclass__` runs whenever a class is subclassed. A metaclass goes further: it's the class of a class, and builds it. Most classes' metaclass is `type`.
class Plugin:
    registry = []

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        Plugin.registry.append(cls.__name__)


class Csv(Plugin):
    pass


class Json(Plugin):
    pass


assert Plugin.registry == ___, '__init_subclass__ sees every subclass'


class Upper(type):
    def __new__(mcs, name, bases, namespace):
        renamed = {k if k.startswith('__') else k.upper(): v for k, v in namespace.items()}
        return super().__new__(mcs, name, bases, renamed)


class Config(metaclass=Upper):
    debug = True


assert hasattr(Config, 'DEBUG') is ___, 'a metaclass can reshape the class'
assert type(Config) is ___, "a class's type is its metaclass"
assert type(int) is ___, 'which is usually type'
assert isinstance(Config, type) is ___, 'a class is an instance of type'
