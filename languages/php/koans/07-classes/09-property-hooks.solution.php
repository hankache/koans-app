<?php
class User
{
    public string $email {
        set => strtolower(trim($value));
    }

    public function __construct(public string $first, public string $last) {}

    public string $fullName {
        get => "{$this->first} {$this->last}";
    }
}
$u = new User('Ada', 'Lovelace');
$u->email = '  ADA@Example.org ';
assertSame('ada@example.org', $u->email, 'the set hook cleaned it');
assertSame('Ada Lovelace', $u->fullName, 'a computed property');
$u->last = 'King';
assertSame('Ada King', $u->fullName, 'computed again on every read');
