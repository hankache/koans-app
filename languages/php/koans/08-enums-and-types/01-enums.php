// title: Enums
// intro: An `enum` lists a type's possible values as cases. Cases are objects, compared with `===`, and an enum can have methods and implement interfaces.
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
assertSame(___, Suit::Hearts->color(), 'a method on a case');
assertSame(___, Suit::Spades === Suit::Spades, 'each case is one object');
assertSame(___, Suit::Spades->name, 'its name');
assertCount(___, Suit::cases(), 'cases() lists them');
assertInstanceOf(___, Suit::Hearts, 'every enum is a UnitEnum');
