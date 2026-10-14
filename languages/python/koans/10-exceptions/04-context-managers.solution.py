from contextlib import contextmanager, suppress

log = []

@contextmanager
def tag(name):
    log.append(f'<{name}>')
    yield
    log.append(f'</{name}>')

with tag('p'):
    log.append('text')
assert log == ['<p>', 'text', '</p>'], 'setup, block, cleanup'
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
assert r == 'opened', 'as takes what __enter__ returns'
assert log[-1] == 'closed', '__exit__ ran at the end'
