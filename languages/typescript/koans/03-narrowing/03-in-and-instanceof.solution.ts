interface Fish {
  swim(): string;
}
interface Bird {
  fly(): string;
}
function move(animal: Fish | Bird): string {
  if ('swim' in animal) {
    assert.type<Fish>(animal, 'in checks for a property');
    return animal.swim();
  }
  return animal.fly();
}
assert.equal(move({ swim: () => 'splash' }), 'splash', 'a fish swims');
function message(problem: Error | string): string {
  if (problem instanceof Error) {
    assert.type<Error>(problem, 'instanceof checks the class');
    return problem.message;
  }
  return problem;
}
assert.equal(message(new Error('boom')), 'boom', 'an error has a message');
