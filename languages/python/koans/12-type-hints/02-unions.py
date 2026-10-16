# title: Unions
# intro: `X | Y` means either type, and `X | None` is the same as `Optional[X]`. `get_origin` and `get_args` take a type like `dict[str, int]` apart.
from typing import Optional, get_args, get_origin

assert (int | None) == ___, 'X | None is Optional[X]'
assert get_args(int | str) == ___, 'get_args lists the members'
assert get_origin(list[int]) is ___, 'get_origin gives the container'
assert get_args(dict[str, int]) == ___, 'get_args gives its parameters'
assert isinstance(3, int | str) is ___, 'isinstance takes a union'
assert (int | str | int) == ___, 'repeated members collapse'
