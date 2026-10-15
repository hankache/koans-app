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
assertSame('Paris', $withAddress->address?->city, '?-> reads through an object');
assertNull($without->address?->city, 'and gives null for null');
assertSame('unknown', $without->address?->city ?? 'unknown', 'often with ??');
assertThrows(ErrorException::class, fn() => $without->address->city, 'without ?, reading a property of null is a warning');
