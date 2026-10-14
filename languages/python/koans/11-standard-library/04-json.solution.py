import json

assert json.dumps({'b': 1, 'a': [1, 2]}, sort_keys=True) == '{"a": [1, 2], "b": 1}', 'dumps writes JSON'
assert json.loads('{"x": true, "y": null}') == {'x': True, 'y': None}, 'true and null become True and None'
assert json.dumps((1, 2)) == '[1, 2]', 'a tuple becomes a JSON array'
assert json.loads('[1, 2]') == [1, 2], 'and comes back as a list'
assert json.dumps('é') == '"\\u00e9"', 'non-ASCII is escaped by default'
