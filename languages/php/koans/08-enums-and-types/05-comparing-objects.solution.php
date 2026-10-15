<?php
class Coin
{
    public function __construct(public int $cents) {}
}
$a = new Coin(5);
$b = new Coin(5);
assertSame(true, $a == $b, 'equal properties: ==');
assertSame(false, $a === $b, 'but two objects');
assertEquals(new Coin(5), $a, 'assertEquals compares objects with ==');
assertSame(true, $a instanceof Coin, 'instanceof');
assertSame('Coin', $a::class, '::class on an object gives its class');
