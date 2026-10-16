// title: Late static binding
// intro: `self::` means the class the code is written in. `static::` means the class the call was made on, so a parent's method can build or name its child.
<?php
class Model
{
    public static function create(): static
    {
        return new static();
    }

    public static function name(): string
    {
        return static::class;
    }

    public static function selfName(): string
    {
        return self::class;
    }
}
class User extends Model
{
}
assertInstanceOf(___, User::create(), 'new static makes the class it was called on');
assertSame(___, User::name(), 'static:: is the class of the call');
assertSame(___, User::selfName(), 'self:: is the class of the code');
assertSame(___, Model::name(), 'called on Model, static is Model');
