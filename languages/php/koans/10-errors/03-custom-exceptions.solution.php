<?php
class OutOfStock extends RuntimeException
{
    public function __construct(public readonly string $item, ?Throwable $previous = null)
    {
        parent::__construct("$item is out of stock", 404, $previous);
    }
}
$e = assertThrows(OutOfStock::class, fn() => throw new OutOfStock('tea'), 'throw your own');
assertSame('tea is out of stock', $e->getMessage(), 'its message');
assertSame('tea', $e->item, 'its data');
$wrapped = new OutOfStock('cake', new LengthException('shelf empty'));
assertSame('shelf empty', $wrapped->getPrevious()->getMessage(), 'getPrevious keeps the cause');
