// title: Property hooks
// intro: Property hooks attach code to a property: a `get` hook computes its value when read, a `set` hook runs when it's assigned, so getters and setters aren't needed.
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
assertSame(___, $u->email, 'the set hook cleaned it');
assertSame(___, $u->fullName, 'a computed property');
$u->last = 'King';
assertSame(___, $u->fullName, 'computed again on every read');
