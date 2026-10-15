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
assertSame(2, Ticket::$issued, 'state shared by the class');
assertInstanceOf(VipTicket::class, $vip, 'new static() makes the class that was called');
class Temperature
{
    public const FREEZING = 0;
}
assertSame(0, Temperature::FREEZING, 'a class constant');
