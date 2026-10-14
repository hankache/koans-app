# title: json
# intro: `json.dumps` turns Python values into JSON text and `json.loads` turns JSON text back into Python values.
import json

assert json.dumps({'b': 1, 'a': [1, 2]}, sort_keys=True) == ___, 'dumps writes JSON'
assert json.loads('{"x": true, "y": null}') == ___, 'true and null become True and None'
assert json.dumps((1, 2)) == ___, 'a tuple becomes a JSON array'
assert json.loads('[1, 2]') == ___, 'and comes back as a list'
assert json.dumps('é') == ___, 'non-ASCII is escaped by default'
