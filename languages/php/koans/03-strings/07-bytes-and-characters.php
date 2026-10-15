// title: Bytes and characters
// intro: PHP strings are bytes. `strlen` counts bytes, so UTF-8 characters like `é` count twice; a regular expression with the `u` flag works on characters.
<?php
assertSame(___, strlen('café'), 'é takes two bytes');
assertSame(___, preg_match_all('/./u', 'café'), 'with /u, a dot matches a character');
assertSame(___, preg_split('//u', 'café', -1, PREG_SPLIT_NO_EMPTY), 'split into characters');
assertSame(___, ord('A'), 'ord gives a byte value');
assertSame(___, chr(97), 'chr goes back');
