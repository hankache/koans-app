from typing import Optional, get_args, get_origin

assert (int | None) == Optional[int], 'X | None is Optional[X]'
assert get_args(int | str) == (int, str), 'get_args lists the members'
assert get_origin(list[int]) is list, 'get_origin gives the container'
assert get_args(dict[str, int]) == (str, int), 'get_args gives its parameters'
assert isinstance(3, int | str) is True, 'isinstance takes a union'
assert (int | str | int) == int | str, 'repeated members collapse'
