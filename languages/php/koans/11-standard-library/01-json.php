// title: JSON
// intro: `json_encode` turns values into JSON and `json_decode` reads it back, as arrays when asked. `JSON_THROW_ON_ERROR` turns bad JSON into an exception.
<?php
assertSame(___, json_encode(['a' => 1, 'b' => [true, null]]), 'an associative array becomes an object');
assertSame(___, json_encode([1, 2]), 'a list becomes an array');
assertSame(___, json_decode('{"x": [1, 2]}', true), 'decoded as arrays');
assertSame(___, json_decode('{"name": "Ada"}')->name, 'or as objects');
assertSame(___, json_encode('café'), 'non-ASCII is escaped by default');
assertSame(___, json_encode('café', JSON_UNESCAPED_UNICODE), 'unless told not to');
assertThrows(___, fn() => json_decode('{bad', flags: JSON_THROW_ON_ERROR), 'bad JSON');
