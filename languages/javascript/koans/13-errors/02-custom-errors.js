// title: Custom errors
// intro: Your own errors are classes that extend `Error`. Setting `name` makes them read well in messages.
class ValidationError extends Error {
  constructor(field) {
    super(`${field} is invalid`);
    this.name = 'ValidationError';
    this.field = field;
  }
}
const check = age => {
  if (age < 0) throw new ValidationError('age');
  return age;
};
expect(() => check(-1), 'throw your own error').toThrow(___);
expect(() => check(-1), 'with its message').toThrow(___);
let error;
try {
  check(-5);
} catch (e) {
  error = e;
}
expect(error.field, 'it can carry data').toBe(___);
expect(String(error), 'name shows in the message').toBe(___);
expect(error, 'and it is still an Error').toBeInstanceOf(___);
