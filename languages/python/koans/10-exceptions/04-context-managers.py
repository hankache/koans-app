# title: Context managers
# intro: `with` runs setup code, then the block, then cleanup code, even if the block raises. `contextlib.contextmanager` turns a generator into a context manager.
from contextlib import contextmanager, suppress

log = []

@contextmanager
def tag(name):
    log.append(f'<{name}>')
    yield
    log.append(f'</{name}>')

with tag('p'):
    log.append('text')
assert log == ___, 'setup, block, cleanup'
with suppress(KeyError):
    {}['missing']
assert True, 'suppress swallowed the KeyError'

class Resource:
    def __enter__(self):
        return 'opened'

    def __exit__(self, *exc):
        log.append('closed')

with Resource() as r:
    pass
assert r == ___, 'as takes what __enter__ returns'
assert log[-1] == ___, '__exit__ ran at the end'
