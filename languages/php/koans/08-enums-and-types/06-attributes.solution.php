<?php
#[Attribute]
class Route
{
    public function __construct(public string $path, public string $method = 'GET')
    {
    }
}
class Controller
{
    #[Route('/home')]
    public function home()
    {
    }

    #[Route('/save', method: 'POST')]
    public function save()
    {
    }

    public function helper()
    {
    }
}
$routes = [];
foreach ((new ReflectionClass(Controller::class))->getMethods() as $m) {
    foreach ($m->getAttributes(Route::class) as $attribute) {
        $route = $attribute->newInstance();
        $routes[$m->getName()] = "$route->method $route->path";
    }
}
assertSame('GET /home', $routes['home'], 'read back through reflection');
assertSame('POST /save', $routes['save'], 'with its arguments');
assertArrayNotHasKey('helper', $routes, 'a method without one has none');
$home = (new ReflectionMethod(Controller::class, 'home'))->getAttributes()[0];
assertSame(['/home'], $home->getArguments(), 'the arguments, as written');
assertSame(Route::class, $home->getName(), 'and the class it names');
