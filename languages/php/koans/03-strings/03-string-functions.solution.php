<?php
assertSame('HELLO', strtoupper('hello'), 'upper case');
assertSame('Hello world', ucfirst('hello world'), 'the first letter');
assertSame('Hello World', ucwords('hello world'), 'every word');
assertSame('trim me', trim('  trim me  '), 'trim spaces');
assertSame('olleh', strrev('hello'), 'reversed');
assertSame('ababab', str_repeat('ab', 3), 'repeated');
assertSame('00042', str_pad('42', 5, '0', STR_PAD_LEFT), 'padded on the left');
