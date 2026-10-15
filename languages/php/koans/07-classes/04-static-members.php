// title: Static members
// intro: `static` properties and methods belong to the class, reached with `::`. Inside, `self::` names the class where the code is written, and `static::` the class actually called, for late static binding.
<?php
class Ticket
{
    public static int $issued = 0;

    public static function issue(): static
    {
        self::$issued++;
        return new static();
    }
}
class VipTicket extends Ticket {}
Ticket::issue();
$vip = VipTicket::issue();
assertSame(___, Ticket::$issued, 'state shared by the class');
assertInstanceOf(___, $vip, 'new static() makes the class that was called');
class Temperature
{
    public const FREEZING = 0;
}
assertSame(___, Temperature::FREEZING, 'a class constant');
