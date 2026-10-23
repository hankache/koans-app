<?php
$person = ['name' => 'Ada', 'born' => 1815];
assertSame('Ada', $person['name'], 'read by key');
$person['field'] = 'math';
assertSame(['name', 'born', 'field'], array_keys($person), 'keys keep their order');
assertArrayHasKey('born', $person, 'assertArrayHasKey');
$mixed = ['1' => 'a', true => 'b'];
assertSame([1 => 'b'], $mixed, "'1' and true both become the key 1");
assertThrows(ErrorException::class, fn() => $person['missing'], 'reading a missing key is a warning (an error in these koans)');
