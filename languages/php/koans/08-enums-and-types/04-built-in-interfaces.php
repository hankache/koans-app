// title: Built-in interfaces
// intro: Implementing PHP's own interfaces lets objects work with the language: `Countable` with `count`, `IteratorAggregate` with `foreach`, `ArrayAccess` with `[]`, `Stringable` with strings.
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
assertSame(___, count($list), 'Countable');
assertSame(___, $list[1], 'ArrayAccess');
assertSame(___, iterator_to_array($list), 'IteratorAggregate');
