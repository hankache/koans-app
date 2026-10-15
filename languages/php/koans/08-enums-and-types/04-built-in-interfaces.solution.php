<?php
class Playlist implements Countable, IteratorAggregate, ArrayAccess
{
    private array $songs = [];

    public function count(): int { return count($this->songs); }
    public function getIterator(): Iterator { return new ArrayIterator($this->songs); }
    public function offsetExists(mixed $offset): bool { return isset($this->songs[$offset]); }
    public function offsetGet(mixed $offset): mixed { return $this->songs[$offset]; }
    public function offsetSet(mixed $offset, mixed $value): void { $offset === null ? $this->songs[] = $value : $this->songs[$offset] = $value; }
    public function offsetUnset(mixed $offset): void { unset($this->songs[$offset]); }
}
$list = new Playlist();
$list[] = 'Intro';
$list[] = 'Outro';
assertSame(2, count($list), 'Countable');
assertSame('Outro', $list[1], 'ArrayAccess');
assertSame(['Intro', 'Outro'], iterator_to_array($list), 'IteratorAggregate');
