<?php
enum Suit
{
    case Hearts;
    case Spades;

    public function color(): string
    {
        return match ($this) {
            Suit::Hearts => 'red',
            Suit::Spades => 'black',
        };
    }
}
assertSame('red', Suit::Hearts->color(), 'a method on a case');
assertSame(true, Suit::Spades === Suit::Spades, 'each case is one object');
assertSame('Spades', Suit::Spades->name, 'its name');
assertCount(2, Suit::cases(), 'cases() lists them');
assertInstanceOf(UnitEnum::class, Suit::Hearts, 'every enum is a UnitEnum');
