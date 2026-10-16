// title: Attributes
// intro: `#[Name(…)]` attaches an attribute to a class, method or property. It does nothing by itself: code reads it back with reflection, and can turn it into an object.
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
assertSame(___, $routes['home'], 'read back through reflection');
assertSame(___, $routes['save'], 'with its arguments');
assertArrayNotHasKey(___, $routes, 'a method without one has none');
$home = (new ReflectionMethod(Controller::class, 'home'))->getAttributes()[0];
assertSame(___, $home->getArguments(), 'the arguments, as written');
assertSame(___, $home->getName(), 'and the class it names');
