// title: Regular expressions
// intro: The `preg_` functions use Perl-compatible patterns: `preg_match` finds a match and fills an array with its groups, `preg_match_all` finds them all, and `preg_replace` replaces.
<?php
assertSame(___, preg_match('/(\d+)-(\d+)/', 'pages 10-20', $m), 'preg_match returns 1 for a match');
assertSame(___, $m[2], 'and fills in the groups');
preg_match('/(?<year>\d{4})-(?<month>\d\d)/', '2026-10', $date);
assertSame(___, $date['month'], 'named groups');
assertSame(___, preg_match_all('/\d+/', 'a1b22c333', $all), 'preg_match_all counts the matches');
assertSame(___, $all[0], 'and collects them');
assertSame(___, preg_replace('/(\w+) (\w+)/', '$2, $1', 'John Smith'), 'replace with groups');
assertMatchesRegularExpression(___, '123', 'assertMatchesRegularExpression');
