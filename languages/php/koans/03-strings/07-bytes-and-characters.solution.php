<?php
assertSame(5, strlen('café'), 'é takes two bytes');
assertSame(4, preg_match_all('/./u', 'café'), 'with /u, a dot matches a character');
assertSame(['c', 'a', 'f', 'é'], preg_split('//u', 'café', -1, PREG_SPLIT_NO_EMPTY), 'split into characters');
assertSame(65, ord('A'), 'ord gives a byte value');
assertSame('a', chr(97), 'chr goes back');
