<?php
assertSame(true, str_contains('haystack', 'st'), 'contains');
assertSame(true, str_starts_with('koans.app', 'koans'), 'starts with');
assertSame(2, strpos('banana', 'n'), 'where it first appears');
assertSame(false, strpos('banana', 'z'), 'or false');
assertSame(0, strpos('banana', 'b'), 'position 0 is falsy: compare with ===');
assertSame('nana', substr('banana', 2), 'substr from a position');
assertSame('an', substr('banana', -3, 2), 'or from the end, with a length');
assertSame(3, substr_count('banana', 'a'), 'count occurrences');
