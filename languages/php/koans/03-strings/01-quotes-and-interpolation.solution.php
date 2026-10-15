<?php
$name = 'Ada';
assertSame('Hello, Ada', "Hello, $name", 'double quotes interpolate');
assertSame('Hello, $name', 'Hello, $name', 'single quotes do not');
$user = ['name' => 'Alan'];
assertSame('Hi Alan', "Hi {$user['name']}", 'braces for an array element');
assertSame(3, strlen("a\tb"), '\\t is one tab character');
assertSame(4, strlen('a\tb'), 'in single quotes it is two characters');
