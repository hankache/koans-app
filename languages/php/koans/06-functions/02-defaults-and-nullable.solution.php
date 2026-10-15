<?php
function greet(string $name = 'world', ?string $title = null): string
{
    return 'Hello, ' . ($title ? "$title " : '') . $name;
}
assertSame('Hello, world', greet(), 'every default');
assertSame('Hello, Dr Grace', greet('Grace', 'Dr'), 'both given');
function describe(int|string $id): string
{
    return get_debug_type($id) . ':' . $id;
}
assertSame('string:a7', describe('a7'), 'a union type');
assertThrows(TypeError::class, fn() => describe([]), 'but not anything');
