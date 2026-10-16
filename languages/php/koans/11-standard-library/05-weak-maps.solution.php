<?php
$cache = new WeakMap();
$user = new stdClass();
$cache[$user] = ['visits' => 3];
assertSame(3, $cache[$user]['visits'], 'a WeakMap attaches data to an object');
assertCount(1, $cache, 'it counts its entries');
unset($user);
assertCount(0, $cache, 'once the object is gone, so is its entry');
$obj = new stdClass();
$ref = WeakReference::create($obj);
assertSame($obj, $ref->get(), 'a WeakReference gives the object while it lives');
$obj = null;
assertSame(null, $ref->get(), 'and null after');
assertThrows(TypeError::class, fn() => $cache['key'] = 1, 'keys must be objects');
