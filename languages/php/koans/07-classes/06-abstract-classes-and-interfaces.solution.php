<?php
interface Shape
{
    public function area(): float;
}
abstract class Polygon implements Shape
{
    abstract public function sides(): int;

    public function describe(): string
    {
        return sprintf('%d sides, area %.1f', $this->sides(), $this->area());
    }
}
final class Square extends Polygon
{
    public function __construct(private float $side) {}
    public function area(): float { return $this->side ** 2; }
    public function sides(): int { return 4; }
}
assertSame('4 sides, area 9.0', (new Square(3))->describe(), 'the abstract class calls the child');
assertInstanceOf(Shape::class, new Square(1), 'a Square is a Shape');
assertThrows(Error::class, fn() => new Polygon(), 'an abstract class cannot be made');
assertSame(['Shape'], array_values(class_implements(new Square(1))), 'class_implements');
