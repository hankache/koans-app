// title: Searching strings
// intro: `str_contains`, `str_starts_with` and `str_ends_with` answer yes or no; `strpos` finds a position, or `false`, so compare it with `===`.
<?php
assertSame(___, str_contains('haystack', 'st'), 'contains');
assertSame(___, str_starts_with('koans.app', 'koans'), 'starts with');
assertSame(___, strpos('banana', 'n'), 'where it first appears');
assertSame(___, strpos('banana', 'z'), 'or false');
assertSame(___, strpos('banana', 'b'), 'position 0 is falsy: compare with ===');
assertSame(___, substr('banana', 2), 'substr from a position');
assertSame(___, substr('banana', -3, 2), 'or from the end, with a length');
assertSame(___, substr_count('banana', 'a'), 'count occurrences');
