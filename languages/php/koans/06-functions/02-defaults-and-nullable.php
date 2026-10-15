// title: Defaults and nullable types
// intro: Parameters can have defaults. `?string` means a string or `null`; a union like `int|string` accepts either.
<?php
function greet(string $name = 'world', ?string $title = null): string
{
    return 'Hello, ' . ($title ? "$title " : '') . $name;
}
assertSame(___, greet(), 'every default');
assertSame(___, greet('Grace', 'Dr'), 'both given');
function describe(int|string $id): string
{
    return get_debug_type($id) . ':' . $id;
}
assertSame(___, describe('a7'), 'a union type');
assertThrows(___, fn() => describe([]), 'but not anything');
