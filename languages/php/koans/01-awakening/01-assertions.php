// title: Assertions
// intro: Koans are tested the way most PHP is tested: with PHPUnit's assertions. `assertSame($expected, $actual, $message)` wants the two to be identical, with the value you expect first. Replace each `___` so every assertion passes.
<?php
assertSame(___, 1 + 1, 'assertSame compares a value and its type');
assertSame(___, 'P' . 'HP', 'the dot joins strings');
assertTrue(___, 'assertTrue wants true itself');
assertNull(___, 'assertNull wants null');
assertCount(___, [1, 2, 3], 'assertCount counts the items of an array');
assertContains(___, [1, 2, 3], 'assertContains looks inside an array');
