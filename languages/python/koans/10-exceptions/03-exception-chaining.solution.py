def parse_age(text):
    try:
        return int(text)
    except ValueError as error:
        raise RuntimeError('not an age') from error

try:
    parse_age('ten')
except RuntimeError as error:
    outer = error
assert str(outer) == 'not an age', 'the new exception'
assert type(outer.__cause__) is ValueError, 'remembers its cause'
assert isinstance(outer, Exception), 'every exception is an Exception'
