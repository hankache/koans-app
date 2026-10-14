# title: Exception chaining
# intro: `raise … from error` raises a new exception that remembers the one that caused it, in its `__cause__`.
def parse_age(text):
    try:
        return int(text)
    except ValueError as error:
        raise RuntimeError('not an age') from error

try:
    parse_age('ten')
except RuntimeError as error:
    outer = error
assert str(outer) == ___, 'the new exception'
assert type(outer.__cause__) is ___, 'remembers its cause'
assert isinstance(outer, Exception), 'every exception is an Exception'
