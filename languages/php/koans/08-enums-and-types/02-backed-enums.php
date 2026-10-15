// title: Backed enums
// intro: A backed enum gives each case a string or int value, for storing or sending. `from` turns a value back into a case, or throws; `tryFrom` gives `null` instead.
<?php
enum Status: string
{
    case Active = 'active';
    case Banned = 'banned';

    public static function default(): self
    {
        return self::Active;
    }
}
assertSame(___, Status::Banned->value, 'its value');
assertSame(___, Status::from('active'), 'from a value');
assertNull(___, 'tryFrom gives null for an unknown value');
assertThrows(___, fn() => Status::from('deleted'), 'from throws');
assertSame(___, array_map(fn($s) => $s->value, Status::cases()), 'all the values');
