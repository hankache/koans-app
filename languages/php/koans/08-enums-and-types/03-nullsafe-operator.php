// title: The nullsafe operator
// intro: `?->` calls a method or reads a property only when there is an object; on `null` the whole chain gives `null`.
<?php
class Address
{
    public function __construct(public string $city) {}
}
class Customer
{
    public function __construct(public ?Address $address = null) {}
}
$withAddress = new Customer(new Address('Paris'));
$without = new Customer();
assertSame(___, $withAddress->address?->city, '?-> reads through an object');
assertNull(___, 'and gives null for null');
assertSame(___, $without->address?->city ?? 'unknown', 'often with ??');
assertThrows(___, fn() => $without->address->city, 'without ?, reading a property of null is a warning');
