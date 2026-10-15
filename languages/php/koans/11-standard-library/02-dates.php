// title: Dates
// intro: `DateTimeImmutable` is a moment in time whose methods return new objects. `format` writes it out, `modify` moves it, and `diff` measures between two.
<?php
$day = new DateTimeImmutable('2026-10-15');
assertSame(___, $day->format('l'), 'the day of the week');
assertSame(___, $day->modify('+1 month')->format('Y-m-d'), 'modify returns a new date');
assertSame(___, $day->format('Y-m-d'), 'the original is unchanged');
$christmas = new DateTimeImmutable('2026-12-25');
assertSame(___, $day->diff($christmas)->days, 'days between');
assertSame(___, (new DateTimeImmutable('2026-02-01'))->modify('last day of this month')->format('Y-m-d'), 'relative formats');
