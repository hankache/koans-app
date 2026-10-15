// title: Quotes and interpolation
// intro: Double quotes interpolate variables and understand escapes like `\n`; single quotes take nearly everything literally. Braces, `{$…}`, interpolate more complex expressions.
<?php
$name = 'Ada';
assertSame(___, "Hello, $name", 'double quotes interpolate');
assertSame(___, 'Hello, $name', 'single quotes do not');
$user = ['name' => 'Alan'];
assertSame(___, "Hi {$user['name']}", 'braces for an array element');
assertSame(___, strlen("a\tb"), '\\t is one tab character');
assertSame(___, strlen('a\tb'), 'in single quotes it is two characters');
