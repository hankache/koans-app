// title: String functions
// intro: PHP's string functions are plain functions, not methods. Each returns a new string.
<?php
assertSame(___, strtoupper('hello'), 'upper case');
assertSame(___, ucfirst('hello world'), 'the first letter');
assertSame(___, ucwords('hello world'), 'every word');
assertSame(___, trim('  trim me  '), 'trim spaces');
assertSame(___, strrev('hello'), 'reversed');
assertSame(___, str_repeat('ab', 3), 'repeated');
assertSame(___, str_pad('42', 5, '0', STR_PAD_LEFT), 'padded on the left');
