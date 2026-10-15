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
assertSame('banned', Status::Banned->value, 'its value');
assertSame(Status::Active, Status::from('active'), 'from a value');
assertNull(Status::tryFrom('deleted'), 'tryFrom gives null for an unknown value');
assertThrows(ValueError::class, fn() => Status::from('deleted'), 'from throws');
assertSame(['active', 'banned'], array_map(fn($s) => $s->value, Status::cases()), 'all the values');
