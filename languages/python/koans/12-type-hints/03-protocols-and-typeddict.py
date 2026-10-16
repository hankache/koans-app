# title: Protocols and TypedDict
# intro: A `Protocol` describes a shape: any class with the right methods fits, no inheritance needed. A `TypedDict` describes a dict's keys and their types, but stays a plain dict.
from typing import Protocol, TypedDict, runtime_checkable


@runtime_checkable
class Closable(Protocol):
    def close(self) -> None: ...


class File:
    def close(self):
        pass


assert isinstance(File(), Closable) is ___, 'a protocol matches by shape'
assert isinstance('text', Closable) is ___, 'a str has no close'


class Movie(TypedDict):
    title: str
    year: int


ran: Movie = {'title': 'Ran', 'year': 1985}
assert type(ran) is ___, 'a TypedDict is a plain dict'
assert Movie.__required_keys__ == ___, 'it knows its keys'


class Note(TypedDict, total=False):
    text: str


assert Note.__required_keys__ == ___, 'total=False makes every key optional'
