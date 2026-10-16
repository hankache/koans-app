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
assertInstanceOf(User::class, User::create(), 'new static makes the class it was called on');
assertSame('User', User::name(), 'static:: is the class of the call');
assertSame('Model', User::selfName(), 'self:: is the class of the code');
assertSame('Model', Model::name(), 'called on Model, static is Model');
