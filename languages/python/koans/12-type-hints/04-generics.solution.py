def first[T](items: list[T]) -> T:
    return items[0]


assert first(['a', 'b']) == 'a', 'one function for any item type'
assert first.__type_params__[0].__name__ == 'T', 'its type parameters are recorded'


class Stack[T]:
    def __init__(self):
        self.items: list[T] = []

    def push(self, item: T):
        self.items.append(item)
        return self


assert Stack[int]().push(1).push(2).items == [1, 2], 'a generic class'


def biggest[N: (int, float)](a: N, b: N) -> N:
    return max(a, b)


assert biggest.__type_params__[0].__constraints__ == (int, float), 'a parameter can be limited'
type Pair[T] = tuple[T, T]
assert Pair.__name__ == 'Pair', 'type makes a named alias'
