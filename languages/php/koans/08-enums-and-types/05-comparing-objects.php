// title: Comparing objects
// intro: `==` compares objects of the same class property by property; `===` asks whether they're the same object. `instanceof` checks a class, a parent or an interface.
<?php
class Coin
{
    public function __construct(public int $cents) {}
}
$a = new Coin(5);
$b = new Coin(5);
assertSame(___, $a == $b, 'equal properties: ==');
assertSame(___, $a === $b, 'but two objects');
assertEquals(___, $a, 'assertEquals compares objects with ==');
assertSame(___, $a instanceof Coin, 'instanceof');
assertSame(___, $a::class, '::class on an object gives its class');
