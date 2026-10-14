# title: match
# intro: `match` compares a value against patterns: literals, sequences, mappings and classes, capturing parts as it goes. A guard, `if …`, adds a condition; `_` matches anything.
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

assert describe(0) == ___, 'a literal pattern'
assert describe(-5) == ___, 'a class pattern with a guard'
assert describe([1, 2]) == ___, 'a sequence pattern captures its items'
assert describe({'name': 'Ada', 'age': 36}) == ___, 'a mapping pattern ignores other keys'
assert describe('hi') == ___, '_ matches anything'
