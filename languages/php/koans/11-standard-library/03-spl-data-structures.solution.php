<?php
$stack = new SplStack();
$stack->push('a');
$stack->push('b');
assertSame('b', $stack->pop(), 'last in, first out');
$queue = new SplQueue();
$queue->enqueue('first');
$queue->enqueue('second');
assertSame('first', $queue->dequeue(), 'first in, first out');
$heap = new SplMinHeap();
foreach ([5, 1, 3] as $n) $heap->insert($n);
assertSame(1, $heap->extract(), 'a heap gives the smallest first');
$seen = new SplObjectStorage();
$key = new stdClass();
$seen[$key] = 'visited';
assertSame('visited', $seen[$key], 'an object as a key');
