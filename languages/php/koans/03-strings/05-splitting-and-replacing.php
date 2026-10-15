// title: Splitting and replacing
// intro: `explode` cuts a string into an array and `implode` joins one back; `str_replace` replaces every match, with arrays for several at once.
<?php
assertSame(___, explode(',', 'a,b,c'), 'explode at commas');
assertSame(___, explode(',', 'a,b,c', 2), 'at most two pieces');
assertSame(___, implode('-', ['x', 'y', 'z']), 'implode joins');
assertSame(___, str_replace(['e', 'o'], ['3', '0'], 'hello'), 'several replacements at once');
assertSame(___, str_split('abcde', 2), 'str_split in fixed lengths');
assertSame(___, strtr('Hi there', ['Hi' => 'Hello']), 'strtr with a map');
