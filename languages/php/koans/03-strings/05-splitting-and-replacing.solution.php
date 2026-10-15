<?php
assertSame(['a', 'b', 'c'], explode(',', 'a,b,c'), 'explode at commas');
assertSame(['a', 'b,c'], explode(',', 'a,b,c', 2), 'at most two pieces');
assertSame('x-y-z', implode('-', ['x', 'y', 'z']), 'implode joins');
assertSame('h3ll0', str_replace(['e', 'o'], ['3', '0'], 'hello'), 'several replacements at once');
assertSame(['ab', 'cd', 'e'], str_split('abcde', 2), 'str_split in fixed lengths');
assertSame('Hello there', strtr('Hi there', ['Hi' => 'Hello']), 'strtr with a map');
