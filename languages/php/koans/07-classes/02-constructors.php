// title: Constructors
// intro: `__construct` sets a new object up. Constructor promotion declares and assigns properties straight from its parameters, and `readonly` properties can be set only once.
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
assertSame(___, $p->y, 'promoted properties');
assertThrows(___, fn() => $p->x = 9, 'readonly cannot change');
$moved = $p->withX(10);
assertSame(___, [$moved->x, $moved->y], 'clone with new values, from inside the class (PHP 8.5)');
assertSame(___, $p->x, 'the original is unchanged');
