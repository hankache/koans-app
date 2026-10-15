// title: Custom exceptions
// intro: Your own exceptions extend `Exception` (or a more specific class), can carry data, and can wrap a lower-level exception as their `previous`.
<?php
class OutOfStock extends RuntimeException
{
    public function __construct(public readonly string $item, ?Throwable $previous = null)
    {
        parent::__construct("$item is out of stock", 404, $previous);
    }
}
$e = assertThrows(OutOfStock::class, fn() => throw new OutOfStock('tea'), 'throw your own');
assertSame(___, $e->getMessage(), 'its message');
assertSame(___, $e->item, 'its data');
$wrapped = new OutOfStock('cake', new LengthException('shelf empty'));
assertSame(___, $wrapped->getPrevious()->getMessage(), 'getPrevious keeps the cause');
