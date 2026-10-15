<?php
assertSame(2, 1 + 1, 'assertSame compares a value and its type');
assertSame('PHP', 'P' . 'HP', 'the dot joins strings');
assertTrue(true, 'assertTrue wants true itself');
assertNull(null, 'assertNull wants null');
assertCount(3, [1, 2, 3], 'assertCount counts the items of an array');
assertContains(2, [1, 2, 3], 'assertContains looks inside an array');
