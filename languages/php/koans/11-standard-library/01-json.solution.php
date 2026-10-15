<?php
assertSame('{"a":1,"b":[true,null]}', json_encode(['a' => 1, 'b' => [true, null]]), 'an associative array becomes an object');
assertSame('[1,2]', json_encode([1, 2]), 'a list becomes an array');
assertSame(['x' => [1, 2]], json_decode('{"x": [1, 2]}', true), 'decoded as arrays');
assertSame('Ada', json_decode('{"name": "Ada"}')->name, 'or as objects');
assertSame('"caf\u00e9"', json_encode('café'), 'non-ASCII is escaped by default');
assertSame('"café"', json_encode('café', JSON_UNESCAPED_UNICODE), 'unless told not to');
assertThrows(JsonException::class, fn() => json_decode('{bad', flags: JSON_THROW_ON_ERROR), 'bad JSON');
