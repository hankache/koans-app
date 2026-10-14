// title: in and instanceof
// intro: `'key' in value` narrows to the types that have that property; `value instanceof Class` narrows to that class.
interface Fish {
  swim(): string;
}
interface Bird {
  fly(): string;
}
function move(animal: Fish | Bird): string {
  if ('swim' in animal) {
    assert.type<___>(animal, 'in checks for a property');
    return animal.swim();
  }
  return animal.fly();
}
assert.equal(move({ swim: () => 'splash' }), ___, 'a fish swims');
function message(problem: Error | string): string {
  if (problem instanceof Error) {
    assert.type<___>(problem, 'instanceof checks the class');
    return problem.message;
  }
  return problem;
}
assert.equal(message(new Error('boom')), ___, 'an error has a message');
