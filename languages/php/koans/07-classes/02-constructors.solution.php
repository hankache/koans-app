<?php
class Point
{
    public function __construct(
        public readonly int $x = 0,
        public readonly int $y = 0,
    ) {}

    public function withX(int $x): static
    {
        return clone($this, ['x' => $x]);
    }
}
$p = new Point(3, 4);
assertSame(4, $p->y, 'promoted properties');
assertThrows(Error::class, fn() => $p->x = 9, 'readonly cannot change');
$moved = $p->withX(10);
assertSame([10, 4], [$moved->x, $moved->y], 'clone with new values, from inside the class (PHP 8.5)');
assertSame(3, $p->x, 'the original is unchanged');
