// title: Weak maps
// intro: A `WeakMap` attaches data to objects without keeping them alive: when an object goes away, so does its entry. A `WeakReference` points at an object the same way.
<?php
$cache = new WeakMap();
$user = new stdClass();
$cache[$user] = ['visits' => 3];
assertSame(___, $cache[$user]['visits'], 'a WeakMap attaches data to an object');
assertCount(___, $cache, 'it counts its entries');
unset($user);
assertCount(___, $cache, 'once the object is gone, so is its entry');
$obj = new stdClass();
$ref = WeakReference::create($obj);
assertSame(___, $ref->get(), 'a WeakReference gives the object while it lives');
$obj = null;
assertSame(___, $ref->get(), 'and null after');
assertThrows(___, fn() => $cache['key'] = 1, 'keys must be objects');
