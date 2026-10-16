from typing import Protocol, TypedDict, runtime_checkable


@runtime_checkable
class Closable(Protocol):
    def close(self) -> None: ...


class File:
    def close(self):
        pass


assert isinstance(File(), Closable) is True, 'a protocol matches by shape'
assert isinstance('text', Closable) is False, 'a str has no close'


class Movie(TypedDict):
    title: str
    year: int


ran: Movie = {'title': 'Ran', 'year': 1985}
assert type(ran) is dict, 'a TypedDict is a plain dict'
assert Movie.__required_keys__ == frozenset({'title', 'year'}), 'it knows its keys'


class Note(TypedDict, total=False):
    text: str


assert Note.__required_keys__ == frozenset(), 'total=False makes every key optional'
