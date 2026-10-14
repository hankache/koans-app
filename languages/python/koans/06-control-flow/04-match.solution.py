def describe(value):
    match value:
        case 0:
            return 'zero'
        case int(n) if n < 0:
            return 'negative'
        case [x, y]:
            return f'pair of {x} and {y}'
        case {'name': name}:
            return f'named {name}'
        case _:
            return 'something else'

assert describe(0) == 'zero', 'a literal pattern'
assert describe(-5) == 'negative', 'a class pattern with a guard'
assert describe([1, 2]) == 'pair of 1 and 2', 'a sequence pattern captures its items'
assert describe({'name': 'Ada', 'age': 36}) == 'named Ada', 'a mapping pattern ignores other keys'
assert describe('hi') == 'something else', '_ matches anything'
