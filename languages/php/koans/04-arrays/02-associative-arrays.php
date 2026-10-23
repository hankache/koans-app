// title: Associative arrays
// intro: The same array type maps keys to values. Keys are ints or strings: a numeric string key becomes an int. Order is kept as items are added.
<?php
$person = ['name' => 'Ada', 'born' => 1815];
assertSame(___, $person['name'], 'read by key');
$person['field'] = 'math';
assertSame(___, array_keys($person), 'keys keep their order');
assertArrayHasKey(___, $person, 'assertArrayHasKey');
$mixed = ['1' => 'a', true => 'b'];
assertSame(___, $mixed, "'1' and true both become the key 1");
assertThrows(___, fn() => $person['missing'], 'reading a missing key is a warning (an error in these koans)');
