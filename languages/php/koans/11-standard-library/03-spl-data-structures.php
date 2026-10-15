// title: SPL data structures
// intro: The Standard PHP Library has data structures beyond arrays: stacks, queues, heaps, and `SplObjectStorage`, which uses objects as keys.
<?php
$stack = new SplStack();
$stack->push('a');
$stack->push('b');
assertSame(___, $stack->pop(), 'last in, first out');
$queue = new SplQueue();
$queue->enqueue('first');
$queue->enqueue('second');
assertSame(___, $queue->dequeue(), 'first in, first out');
$heap = new SplMinHeap();
foreach ([5, 1, 3] as $n) $heap->insert($n);
assertSame(___, $heap->extract(), 'a heap gives the smallest first');
$seen = new SplObjectStorage();
$key = new stdClass();
$seen[$key] = 'visited';
assertSame(___, $seen[$key], 'an object as a key');
